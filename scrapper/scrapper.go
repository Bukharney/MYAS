package scrapper

import (
	"fmt"
	"log"
	"strings"
	"sync"
	"time"

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

func CookiesToMap(cookies []playwright.Cookie) []playwright.OptionalCookie {
	var cookieMap []playwright.OptionalCookie
	for _, cookie := range cookies {
		cookieMap = append(cookieMap, playwright.OptionalCookie{
			Name:     cookie.Name,
			Value:    cookie.Value,
			Domain:   &cookie.Domain,
			Path:     &cookie.Path,
			Expires:  &cookie.Expires,
			HttpOnly: &cookie.HttpOnly,
			Secure:   &cookie.Secure,
			SameSite: cookie.SameSite,
		})
	}
	return cookieMap
}

func getAssignments(page playwright.Page, classID string) (ClassAssignments, error) {
	var ass ClassAssignments
	_, err := page.Goto(fmt.Sprintf("https://app.leb2.org/class/%s/activity", classID))
	if err != nil {
		return ass, fmt.Errorf("could not goto class activity page: %v", err)
	}

	err = page.WaitForLoadState()
	if err != nil {
		return ass, fmt.Errorf("could not wait for load: %v", err)
	}
	log.Println("Page loaded: ", time.Now().Unix())

	classNameCode, err := page.Locator("p[name=code]").InnerText()
	if err != nil {
		return ass, fmt.Errorf("could not get class code: %v", err)
	}

	classNameLN, err := page.Locator("p[name=name_ln]").InnerText()
	if err != nil {
		return ass, fmt.Errorf("could not get class name: %v", err)
	}

	className := classNameCode + " : " + classNameLN

	html, err := page.Locator("div.table-responsive").InnerHTML()
	if err != nil {
		return ass, fmt.Errorf("could not get assignments HTML: %v", err)
	}

	doc, err := goquery.NewDocumentFromReader(strings.NewReader(html))
	if err != nil {
		return ass, fmt.Errorf("could not parse assignments HTML: %v", err)
	}

	ass = ClassAssignments{
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
			ass.Assignments = append(ass.Assignments, assignment)
		}
	})

	return ass, nil
}

func ScrapeAssignments(username, password string) ([]ClassAssignments, error) {
	start := time.Now()
	log.Printf("Time: %d", start.Unix())
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

	log.Printf("Logged in as %s", username)

	_, err = page.Goto("https://app.leb2.org/class")
	if err != nil {
		return nil, fmt.Errorf("could not goto class list page: %v", err)
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

	log.Printf("Found %d classes", len(classList))

	// var wg sync.WaitGroup
	// wg.Add(len(classList))
	// var c SafeCounter
	// cookies, err := page.Context().Cookies()
	// if err != nil {
	// 	return nil, fmt.Errorf("could not get cookies: %v", err)
	// }
	// NewCockies := cookiesToMap(cookies)
	var a []ClassAssignments
	log.Printf("Getting assignments for %d classes", len(classList))
	for _, classID := range classList {
		ass, err := getAssignments(page, classID)
		if err != nil {
			log.Printf("could not get assignments for class %s: %v", classID, err)
		}

		a = append(a, ass)

		// go func() {
		// 	defer wg.Done()
		// 	err := c.getAssignments(classID, NewCockies, browser)
		// 	if err != nil {
		// 		log.Printf("could not get assignments for class %s: %v", classID, err)
		// 	}
		// }()
	}

	log.Printf("Time: %d", time.Now().Unix()-start.Unix())

	return a, nil
}

type SafeAssignments struct {
	mu          sync.Mutex
	assignments []ClassAssignments
}

func (c *SafeAssignments) GetAssignments(classID string, cookies []playwright.OptionalCookie, browser playwright.Browser) error {
	log.Printf("Getting assignments for class %s", classID)
	log.Println("Start: ", time.Now().Unix())

	page, err := browser.NewPage()
	if err != nil {
		return fmt.Errorf("could not create page: %v", err)
	}
	log.Println("Page created: ", time.Now().Unix())

	err = page.Context().AddCookies(
		cookies,
	)
	if err != nil {
		return fmt.Errorf("could not add cookies: %v", err)
	}
	log.Println("Cookies added: ", time.Now().Unix())

	ass, err := getAssignments(page, classID)
	if err != nil {
		log.Println(err)
	}

	c.mu.Lock()
	c.assignments = append(c.assignments, ass)
	c.mu.Unlock()

	log.Println("Done: ", time.Now().Unix())
	return nil
}
