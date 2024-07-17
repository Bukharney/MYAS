package usecases

import (
	"encoding/hex"
	"fmt"
	"net/http"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/modules/entities"
	"github.com/Bukharney/go-scrapper/utils"
	"github.com/gin-gonic/gin"
)

type AuthUsecases struct {
	Cfg      *configs.Configs
	AuthRepo entities.AuthRepository
}

func NewAuthUsecase(cfg *configs.Configs, authRepo entities.AuthRepository) entities.AuthUsecase {
	return &AuthUsecases{
		Cfg:      cfg,
		AuthRepo: authRepo,
	}
}

func (a *AuthUsecases) Login(user entities.UserData) (entities.ResToken, int, error) {
	var token entities.ResToken
	access, refresh, err := a.SignNewToken(user.UserID, user.Password)
	if err != nil {
		return token, http.StatusInternalServerError, err
	}

	encryptPass, err := utils.Encrypt([]byte(a.Cfg.Auth.AesKey), []byte(user.Password))
	if err != nil {
		return token, http.StatusInternalServerError, err
	}

	err = a.AuthRepo.SetUser(entities.UserData{
		UserID:       user.UserID,
		Password:     hex.EncodeToString(encryptPass),
		RefreshToken: refresh,
	})
	if err != nil {
		return token, http.StatusInternalServerError, err
	}

	token.AccessToken = access
	token.RefreshToken = refresh

	if token.AccessToken == "" || token.RefreshToken == "" {
		return token, http.StatusInternalServerError, fmt.Errorf("internal server error")
	}

	return token, http.StatusOK, nil
}

func (a *AuthUsecases) RefreshToken(ctx *gin.Context) (entities.ResToken, int, error) {
	var token entities.ResToken
	tokenPart, err := utils.GetTokenPart(ctx)
	if err != nil {
		return token, http.StatusUnauthorized, err
	}

	_, user, err := utils.CheckToken(ctx, a.Cfg, tokenPart.RefreshToken, "refresh")
	if err != nil {
		return token, http.StatusUnauthorized, err
	}

	redisUser, err := a.AuthRepo.GetUserById(user.UserID)
	if err != nil {
		return token, http.StatusNotFound, err
	}

	if redisUser.RefreshToken != tokenPart.RefreshToken {
		return token, http.StatusUnauthorized, fmt.Errorf("invalid token")
	}

	NewToken, code, err := utils.RefreshToken(ctx, redisUser, a.Cfg, tokenPart.RefreshToken)
	if err != nil {
		return token, code, err
	}

	err = a.AuthRepo.UpdateUser(entities.UserData{
		UserID:       user.UserID,
		RefreshToken: NewToken.RefreshToken,
	})
	if err != nil {
		return token, http.StatusInternalServerError, err
	}

	token.AccessToken = NewToken.AccessToken
	token.RefreshToken = NewToken.RefreshToken

	if token.AccessToken == "" || token.RefreshToken == "" {
		return token, http.StatusInternalServerError, fmt.Errorf("internal server error")
	}

	return token, http.StatusOK, nil
}

func (a *AuthUsecases) Logout(ctx *gin.Context) (int, error) {
	tokenPart, err := utils.GetTokenPart(ctx)
	if err != nil {
		return http.StatusUnauthorized, err
	}

	_, user, err := utils.CheckToken(ctx, a.Cfg, tokenPart.RefreshToken, "refresh")
	if err != nil {
		return http.StatusUnauthorized, err
	}

	err = a.AuthRepo.DeleteUserById(user.UserID)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	return http.StatusOK, nil
}

func (a *AuthUsecases) SignNewToken(id int, password string) (string, string, error) {
	access, err := utils.SignNewToken(a.Cfg, id, "access")
	if err != nil {
		return "", "", err
	}

	refresh, err := utils.SignNewToken(a.Cfg, id, "refresh")
	if err != nil {
		return "", "", err
	}

	return access, refresh, nil
}
