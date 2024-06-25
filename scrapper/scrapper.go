package scrapper

import (
	"fmt"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/playwright-community/playwright-go"
)

type Assignment struct {
	Name       string
	Submission string
	DueDate    string
}

type ClassAssignments struct {
	ClassName   string
	Assignments []Assignment
}

func ScrapeAssignments(username, password string) ([]ClassAssignments, error) {
	pw, err := playwright.Run()
	if err != nil {
		return nil, fmt.Errorf("could not start Playwright: %v", err)
	}
	defer pw.Stop()

	browser, err := pw.Chromium.Launch()
	if err != nil {
		return nil, fmt.Errorf("could not launch browser: %v", err)
	}
	defer browser.Close()

	page, err := browser.NewPage()
	if err != nil {
		return nil, fmt.Errorf("could not create page: %v", err)
	}

	_, err = page.Goto("https://login1.leb2.org/login?app_id=1&redirect_uri=https%3A%2F%2Fapp.leb2.org%2Flogin")
	if err != nil {
		return nil, fmt.Errorf("could not goto login page: %v", err)
	}

	err = page.Locator("input[name='username']").Fill(username)
	if err != nil {
		return nil, fmt.Errorf("could not fill username: %v", err)
	}

	err = page.Locator("input[name='password']").Fill(password)
	if err != nil {
		return nil, fmt.Errorf("could not fill password: %v", err)
	}

	err = page.Locator("button[type='submit']").Click()
	if err != nil {
		return nil, fmt.Errorf("could not click submit: %v", err)
	}

	err = page.WaitForLoadState()
	if err != nil {
		return nil, fmt.Errorf("could not wait for load: %v", err)
	}

	if page.URL() == "https://login1.leb2.org/login?app_id=1&redirect_uri=https%3A%2F%2Fapp.leb2.org%2Flogin" {
		return nil, fmt.Errorf("invalid credentials")
	}

	html, err := page.Locator("#classListMain").InnerHTML()
	if err != nil {
		return nil, fmt.Errorf("could not get class list HTML: %v", err)
	}

	doc, err := goquery.NewDocumentFromReader(strings.NewReader(html))
	if err != nil {
		return nil, fmt.Errorf("could not parse class list HTML: %v", err)
	}

	var classList []string
	doc.Find("div.class-card").Each(func(i int, s *goquery.Selection) {
		name, exists := s.Attr("name")
		if exists {
			classList = append(classList, name[5:])
		}
	})

	var assignmentsList []ClassAssignments

	for _, classID := range classList {
		_, err := page.Goto(fmt.Sprintf("https://app.leb2.org/class/%s/activity", classID))
		if err != nil {
			return nil, fmt.Errorf("could not goto class activity page: %v", err)
		}

		err = page.WaitForLoadState()
		if err != nil {
			return nil, fmt.Errorf("could not wait for load: %v", err)
		}

		classNameCode, err := page.Locator("p[name=code]").InnerText()
		if err != nil {
			return nil, fmt.Errorf("could not get class code: %v", err)
		}

		classNameLN, err := page.Locator("p[name=name_ln]").InnerText()
		if err != nil {
			return nil, fmt.Errorf("could not get class name: %v", err)
		}

		className := classNameCode + " : " + classNameLN

		html, err := page.Locator("div.table-responsive").InnerHTML()
		if err != nil {
			return nil, fmt.Errorf("could not get assignments HTML: %v", err)
		}

		doc, err = goquery.NewDocumentFromReader(strings.NewReader(html))
		if err != nil {
			return nil, fmt.Errorf("could not parse assignments HTML: %v", err)
		}

		assignments := ClassAssignments{
			ClassName:   className,
			Assignments: []Assignment{},
		}

		doc.Find("tr").Each(func(i int, s *goquery.Selection) {
			var assignment Assignment
			if s.Find("a.assessment__title-link").Length() > 0 {
				assignment.Name = s.Find("a.assessment__title-link").Text()
			}
			if s.Find("td[data-label='Submissions']").Length() > 0 {
				assignment.Submission = s.Find("td[data-label='Submissions']").Text()
			}
			if s.Find("td[data-label='Due Date']").Find("span").Length() > 0 {
				dueDate, exists := s.Find("td[data-label='Due Date']").Find("span").Attr("title")
				if exists {
					assignment.DueDate = dueDate
				}
			}
			if assignment.Name != "" {
				assignments.Assignments = append(assignments.Assignments, assignment)
			}
		})

		assignmentsList = append(assignmentsList, assignments)
	}

	return assignmentsList, nil
}
