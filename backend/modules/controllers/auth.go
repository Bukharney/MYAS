package controllers

import (
	"net/http"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/middlewares"
	"github.com/Bukharney/go-scrapper/modules/entities"
	"github.com/gin-gonic/gin"
)

type AuthController struct {
	AuthUsecase entities.AuthUsecase
	Cfg         *configs.Configs
}

func NewAuthController(r gin.IRoutes, cfg *configs.Configs, authUsecase entities.AuthUsecase) {
	authController := &AuthController{
		Cfg:         cfg,
		AuthUsecase: authUsecase,
	}

	r.POST("/login", authController.Login)
	r.POST("/logout", middlewares.JwtAuthentication(cfg), authController.Logout)
	r.GET("/refresh-token", authController.RefreshToken)
}

func (c *AuthController) Login(ctx *gin.Context) {
	var authCredentials entities.Leb2Credentials
	u, p, ok := ctx.Request.BasicAuth()
	if !ok {
		ctx.JSON(401, gin.H{"error": "Unauthorized"})
		return
	}

	authCredentials.Username = u
	authCredentials.Password = p

	token, code, err := c.AuthUsecase.Login(authCredentials)
	if err != nil {
		ctx.JSON(code, gin.H{"error": err.Error()})
		return
	}

	domain := ctx.Request.Header.Get("Host")
	println(domain)

	ctx.SetSameSite(http.SameSiteNoneMode)
	ctx.SetCookie("access_token", token.AccessToken, c.Cfg.Auth.AccessTokenExpiresIn, "/", "", true, true)
	ctx.SetCookie("refresh_token", token.RefreshToken, c.Cfg.Auth.RefreshTokenExpiresIn, "/", "", true, true)
}

func (c *AuthController) RefreshToken(ctx *gin.Context) {
	token, code, err := c.AuthUsecase.RefreshToken(ctx)
	if err != nil {
		ctx.JSON(code, gin.H{"error": err.Error()})
		return
	}

	ctx.SetSameSite(http.SameSiteNoneMode)
	ctx.SetCookie("access_token", token.AccessToken, c.Cfg.Auth.AccessTokenExpiresIn, "/", "", true, true)
	ctx.SetCookie("refresh_token", token.RefreshToken, c.Cfg.Auth.RefreshTokenExpiresIn, "/", "", true, true)
}

func (c *AuthController) Logout(ctx *gin.Context) {
	code, err := c.AuthUsecase.Logout(ctx)
	if err != nil {
		ctx.JSON(code, gin.H{"error": err.Error()})
		return
	}

	ctx.SetSameSite(http.SameSiteNoneMode)
	ctx.SetCookie("access_token", "", 0, "/", "", true, true)
	ctx.SetCookie("refresh_token", "", 0, "/", "", true, true)
}
