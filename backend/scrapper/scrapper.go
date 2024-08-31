package scrapper

import (
	"fmt"
	"log"
	"strings"
	"sync"

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

func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func CookieFilter(cookies []playwright.Cookie) []playwright.Cookie {
	var cookieList []playwright.Cookie
	cList := []string{"laravel_session", "leb2_session", "XSRF-TOKEN"}
	for _, cookie := range cookies {
		if contains(cList, cookie.Name) {
			cookieList = append(cookieList, cookie)
		}
	}
	return cookieList
}

func CookiesOptions(cookies []playwright.Cookie) []playwright.OptionalCookie {
	var cookieOptions []playwright.OptionalCookie
	cookies = CookieFilter(cookies)
	for _, cookie := range cookies {
		cookieOptions = append(cookieOptions, playwright.OptionalCookie{
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
	return cookieOptions
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

	classNameCode, err := page.Locator("p[name=code]").InnerText()
	if err != nil {
		return ass, fmt.Errorf("could not get class code: %v", err)
	}

	classNameLN, err := page.Locator("p[name=name_ln]").InnerText()
	if err != nil {
		return ass, fmt.Errorf("could not get class name: %v", err)
	}

	className := classNameCode + " : " + classNameLN

	ass = ClassAssignments{
		ClassName:   className,
		Assignments: []Assignment{},
	}

	html, err := page.Locator("div.table-responsive").InnerHTML()
	if err != nil {
		return ass, fmt.Errorf("could not get assignments HTML: %v", err)
	}

	doc, err := goquery.NewDocumentFromReader(strings.NewReader(html))
	if err != nil {
		return ass, fmt.Errorf("could not parse assignments HTML: %v", err)
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

func LEB2Login(page playwright.Page, username string, password string) ([]playwright.Cookie, error) {
	_, err := page.Goto("https://login1.leb2.org/login?app_id=1&redirect_uri=https%3A%2F%2Fapp.leb2.org%2Flogin")
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

	cookie, err := page.Context().Cookies()
	if err != nil {
		return nil, fmt.Errorf("could not get cookies: %v", err)
	}

	cookie = CookieFilter(cookie)

	return cookie, nil
}

func InitPlaywright() (playwright.Page, error) {
	pw, err := playwright.Run()
	if err != nil {
		return nil, fmt.Errorf("could not start Playwright: %v", err)
	}

	browser, err := pw.Chromium.Launch(
		playwright.BrowserTypeLaunchOptions{
			Args: []string{
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-gl-drawing-for-tests",
			},
		},
	)
	if err != nil {
		return nil, fmt.Errorf("could not launch browser: %v", err)
	}

	page, err := browser.NewPage()
	if err != nil {
		return nil, fmt.Errorf("could not create page: %v", err)
	}

	page.SetViewportSize(1920, 1080)

	return page, err
}

func GetClassList(page playwright.Page) ([]string, error) {
	_, err := page.Goto("https://app.leb2.org/class")
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

	return classList, nil
}

func GetAssignmentsSequence(page playwright.Page, classList []string) ([]ClassAssignments, error) {
	defer page.Close()
	var a []ClassAssignments
	for _, classID := range classList {
		ass, err := getAssignments(page, classID)
		if err != nil {
			log.Printf("could not get assignments for class %s: %v", classID, err)
		}

		a = append(a, ass)
	}

	return a, nil
}

func ScrapeAssignmentsByCookies(cookies []playwright.Cookie) ([]ClassAssignments, error) {
	page, err := InitPlaywright()
	if err != nil {
		return nil, fmt.Errorf("could not start Playwright: %v", err)
	}

	page.Context().AddCookies(
		CookiesOptions(cookies),
	)

	classList, err := GetClassList(page)
	if err != nil {
		return nil, fmt.Errorf("could not get class list: %v", err)
	}

	a, err := GetAssignmentsSequence(page, classList)
	if err != nil {
		return nil, fmt.Errorf("could not get assignments: %v", err)
	}

	page.Close()

	return a, nil
}

func ScrapeAssignmentsByPassword(username, password string) ([]ClassAssignments, error) {
	page, err := InitPlaywright()
	if err != nil {
		return nil, fmt.Errorf("could not start Playwright: %v", err)
	}

	_, err = LEB2Login(page, username, password)
	if err != nil {
		return nil, fmt.Errorf("could not login: %v", err)
	}

	classList, err := GetClassList(page)
	if err != nil {
		return nil, fmt.Errorf("could not get class list: %v", err)
	}

	a, err := GetAssignmentsSequence(page, classList)
	if err != nil {
		return nil, fmt.Errorf("could not get assignments: %v", err)
	}

	return a, nil
}

type SafeAssignments struct {
	mu          sync.Mutex
	assignments []ClassAssignments
}

func (c *SafeAssignments) GetAssignments(classID string, cookies []playwright.OptionalCookie, browser playwright.Browser) error {
	page, err := browser.NewPage()
	if err != nil {
		return fmt.Errorf("could not create page: %v", err)
	}

	err = page.Context().AddCookies(
		cookies,
	)
	if err != nil {
		return fmt.Errorf("could not add cookies: %v", err)
	}

	ass, err := getAssignments(page, classID)
	if err != nil {
		log.Println(err)
	}

	c.mu.Lock()
	c.assignments = append(c.assignments, ass)
	c.mu.Unlock()

	return nil
}
