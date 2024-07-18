package entities

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/playwright-community/playwright-go"
)

type AuthUsecase interface {
	Login(user Leb2Credentials) (ResToken, int, error)
	RefreshToken(ctx *gin.Context) (ResToken, int, error)
	Logout(ctx *gin.Context) (int, error)
}

type AuthRepository interface {
	DeleteUserById(userId string) error
	GetUserById(userId string) (UserData, error)
	SetUser(user UserData) error
	UpdateUser(user UserData) error
}

type AuthCredentials struct {
	Email    string `json:"email" db:"email" binding:"required"`
	Password string `json:"password" db:"password" binding:"required"`
}

type AccessTokenCustomClaims struct {
	UserID    string `json:"user_id"`
	TokenType string `json:"token_type"`
	jwt.RegisteredClaims
}

type Leb2Credentials struct {
	Username string `json:"username" db:"username" binding:"required"`
	Password string `json:"password" db:"password" binding:"required"`
}

type UserData struct {
	UserID       string              `json:"user_id" bson:"user_id"`
	RefreshToken string              `json:"refresh_token" bson:"refresh_token"`
	Cookies      []playwright.Cookie `json:"cookies"`
}

type ResToken struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type EmailVerification struct {
	From    string
	To      string
	Subject string
	Body    string
}
