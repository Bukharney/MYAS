package utils

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/modules/entities"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func GetTokenPart(c *gin.Context) (entities.ResToken, error) {
	var tokenPart entities.ResToken
	tokenHeader := c.Request.Header.Get("Cookie")
	if tokenHeader == "" {
		return tokenPart, fmt.Errorf("no token found")
	}

	token := strings.Split(tokenHeader, ";")

	for _, t := range token {
		cleanToken := strings.Split(t, "=")
		switch cleanToken[0] {
		case "access_token":
			tokenPart.AccessToken = cleanToken[1]
		case "refresh_token":
			tokenPart.RefreshToken = cleanToken[1]
		}
	}

	return tokenPart, nil
}

func CheckToken(c *gin.Context, cfg *configs.Configs, tokenPart string, tokenType string) (*jwt.Token, entities.AccessTokenCustomClaims, error) {
	var secret string
	switch tokenType {
	case "access":
		secret = cfg.Auth.JwtAccessSecret
	case "refresh":
		secret = cfg.Auth.JwtRefreshSecret
	}

	claims := entities.AccessTokenCustomClaims{}
	token, err := jwt.ParseWithClaims(tokenPart, &claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil {
		return nil, claims, err
	}

	if !token.Valid {
		return nil, claims, fmt.Errorf("invalid token")
	}

	return token, claims, err
}

func SignNewToken(cfg *configs.Configs, userId int, tokenType string) (string, error) {
	claims := &entities.AccessTokenCustomClaims{}
	claims.UserID = userId
	claims.IssuedAt = jwt.NewNumericDate(time.Now())
	claims.NotBefore = jwt.NewNumericDate(time.Now())
	claims.Issuer = "healword.auth.service"

	var secret string
	switch tokenType {
	case "access":
		claims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(time.Duration(cfg.Auth.AccessTokenExpiresIn) * time.Second))
		claims.TokenType = tokenType
		secret = cfg.Auth.JwtAccessSecret
	case "refresh":
		claims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(time.Duration(cfg.Auth.RefreshTokenExpiresIn) * time.Second))
		claims.TokenType = tokenType
		secret = cfg.Auth.JwtRefreshSecret
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}

	return ss, nil
}

func RefreshToken(ctx *gin.Context, user entities.UserData, cfg *configs.Configs, tokenPart string) (entities.ResToken, int, error) {
	var token entities.ResToken
	_, claims, err := CheckToken(ctx, cfg, tokenPart, "refresh")
	if err != nil {
		return token, http.StatusUnauthorized, err
	}

	if user.RefreshToken != tokenPart {
		return token, http.StatusUnauthorized, err
	} else if user.UserID != claims.UserID {
		return token, http.StatusUnauthorized, err
	}

	access, err := SignNewToken(cfg, claims.UserID, "access")
	if err != nil {
		return token, http.StatusInternalServerError, err
	}

	refresh, err := SignNewToken(cfg, claims.UserID, "refresh")
	if err != nil {
		return token, http.StatusInternalServerError, err
	}

	token.AccessToken = access
	token.RefreshToken = refresh

	return token, http.StatusOK, nil
}
