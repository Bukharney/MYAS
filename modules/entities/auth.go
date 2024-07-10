package entities

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type AuthUsecase interface {
	Login(user UserData) (ResToken, int, error)
	RefreshToken(ctx *gin.Context) (ResToken, int, error)
	Logout(ctx *gin.Context) (int, error)
}

type AuthRepository interface {
	DeleteToken(userId int) error
	GetToken(userId int) (UserData, error)
	SetToken(token UserData) error
	UpdateToken(token UserData) error
}

type AuthCredentials struct {
	Email    string `json:"email" db:"email" binding:"required"`
	Password string `json:"password" db:"password" binding:"required"`
}

type AccessTokenCustomClaims struct {
	UserID    int    `json:"user_id"`
	TokenType string `json:"token_type"`
	jwt.RegisteredClaims
}

type UserData struct {
	UserID       int    `json:"user_id" bson:"user_id"`
	Password     string `json:"password" bson:"password"`
	RefreshToken string `json:"refresh_token" bson:"refresh_token"`
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
