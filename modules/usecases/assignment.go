package usecases

import (
	"fmt"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/modules/entities"
	"github.com/Bukharney/go-scrapper/scrapper"
	"github.com/Bukharney/go-scrapper/utils"
	"github.com/gin-gonic/gin"
)

type AssignmentsUsecase struct {
	Cfg      *configs.Configs
	AuthRepo entities.AuthRepository
}

func NewAssignmentsUsecase(cfg *configs.Configs, authRepo entities.AuthRepository) *AssignmentsUsecase {
	return &AssignmentsUsecase{
		Cfg:      cfg,
		AuthRepo: authRepo,
	}
}

func (u *AssignmentsUsecase) GetAssignments(c *gin.Context) ([]scrapper.ClassAssignments, int, error) {
	tokenPart, err := utils.GetTokenPart(c)
	if err != nil {
		return []scrapper.ClassAssignments{}, 401, fmt.Errorf("g")
	}

	if tokenPart.RefreshToken == "" {
		return []scrapper.ClassAssignments{}, 401, fmt.Errorf("h")
	}

	_, user, err := utils.CheckToken(c, u.Cfg, tokenPart.RefreshToken, "refresh")
	if err != nil {
		return []scrapper.ClassAssignments{}, 401, fmt.Errorf("c")
	}

	redisUser, err := u.AuthRepo.GetUserById(user.UserID)
	if err != nil {
		return []scrapper.ClassAssignments{}, 401, fmt.Errorf("i")
	}

	if redisUser.RefreshToken != tokenPart.RefreshToken {
		return []scrapper.ClassAssignments{}, 401, nil
	}

	assignments, err := scrapper.ScrapeAssignmentsByCookies(redisUser.Cookies)
	if err != nil {
		return []scrapper.ClassAssignments{}, 500, err
	}
	if len(assignments) == 0 {
		return []scrapper.ClassAssignments{}, 500, nil
	}

	return assignments, 200, nil
}

func (u *AssignmentsUsecase) GetAssignmentsNoLogin(c *gin.Context, user entities.Leb2Credentials) ([]scrapper.ClassAssignments, int, error) {
	assignments, err := scrapper.ScrapeAssignmentsByPassword(user.Username, user.Password)
	if err != nil {
		return []scrapper.ClassAssignments{}, 500, err
	}
	if len(assignments) == 0 {
		return []scrapper.ClassAssignments{}, 500, nil
	}

	return assignments, 200, nil
}
