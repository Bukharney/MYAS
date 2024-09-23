package usecases

import (
	"context"
	"fmt"
	"sync"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/modules/entities"
	"github.com/Bukharney/go-scrapper/scrapper"
	"github.com/Bukharney/go-scrapper/utils"
	"github.com/gin-gonic/gin"
)

type AssignmentsUsecase struct {
	Cfg        *configs.Configs
	AuthRepo   entities.AuthRepository
	Mu         sync.Mutex
	Playwright *scrapper.Playwright
	Pages      map[string]context.CancelFunc
}

func NewAssignmentsUsecase(cfg *configs.Configs, authRepo entities.AuthRepository, playwright *scrapper.Playwright) *AssignmentsUsecase {
	return &AssignmentsUsecase{
		Cfg:        cfg,
		AuthRepo:   authRepo,
		Playwright: playwright,
		Pages:      make(map[string]context.CancelFunc),
	}
}

func (u *AssignmentsUsecase) GetAssignments(c *gin.Context) ([]scrapper.ClassAssignments, int, error) {
	tokenPart, err := utils.GetTokenPart(c)
	if err != nil {
		return []scrapper.ClassAssignments{}, 401, err
	}

	if tokenPart.RefreshToken == "" {
		return []scrapper.ClassAssignments{}, 401, err
	}

	_, user, err := utils.CheckToken(c, u.Cfg, tokenPart.RefreshToken, "refresh")
	if err != nil {
		return []scrapper.ClassAssignments{}, 401, err
	}

	redisUser, err := u.AuthRepo.GetUserById(user.UserID)
	if err != nil {
		return []scrapper.ClassAssignments{}, 401, err
	}

	if redisUser.RefreshToken != tokenPart.RefreshToken {
		return []scrapper.ClassAssignments{}, 401, fmt.Errorf("invalid token")
	}

	u.Mu.Lock()
	if cancel, ok := u.Pages[user.UserID]; ok {
		cancel()
	}
	u.Mu.Unlock()

	ctx, cancel := context.WithCancel(context.Background())

	u.Mu.Lock()
	u.Pages[user.UserID] = cancel
	u.Mu.Unlock()

	page, err := scrapper.NewPage(u.Playwright)
	if err != nil {
		return []scrapper.ClassAssignments{}, 500, err
	}

	assignments, err := scrapper.ScrapeAssignmentsByCookiesWithContext(ctx, page, redisUser.Cookies)
	if err != nil {
		return []scrapper.ClassAssignments{}, 500, err
	}

	if len(assignments) == 0 {
		return []scrapper.ClassAssignments{}, 500, fmt.Errorf("no assignments found")
	}

	defer func() {
		u.Mu.Lock()
		delete(u.Pages, user.UserID)
		page.Close()
		u.Mu.Unlock()
	}()

	return assignments, 200, nil
}

func (u *AssignmentsUsecase) GetAssignmentsNoLogin(c *gin.Context, user entities.Leb2Credentials) ([]scrapper.ClassAssignments, int, error) {
	u.Mu.Lock()
	if cancel, ok := u.Pages[user.Username]; ok {
		cancel()
	}
	u.Mu.Unlock()

	ctx, cancel := context.WithCancel(context.Background())

	u.Mu.Lock()
	u.Pages[user.Username] = cancel
	u.Mu.Unlock()

	page, err := scrapper.NewPage(u.Playwright)
	if err != nil {
		return []scrapper.ClassAssignments{}, 500, err
	}

	assignments, err := scrapper.ScrapeAssignmentsByPassword(ctx, page, user.Username, user.Password)
	if err != nil {
		return []scrapper.ClassAssignments{}, 500, err
	}
	if len(assignments) == 0 {
		return []scrapper.ClassAssignments{}, 500, nil
	}

	defer func() {
		u.Mu.Lock()
		delete(u.Pages, user.Username)
		page.Close()
		u.Mu.Unlock()
	}()

	return assignments, 200, nil
}
