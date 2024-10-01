package configs

import (
	"log"
	"os"
)

type Configs struct {
	MongoDB MongoDB
	Redis   Redis
	App     Gin
	Auth    Auth
}

type Gin struct {
	Host string
	Port string
}

type MongoDB struct {
	Username string
	Password string
	Cluster  string
	DbName   string
}

type Auth struct {
	JwtAccessSecret       string
	JwtRefreshSecret      string
	AccessTokenExpiresIn  int
	RefreshTokenExpiresIn int
	VerificationExpiresIn int
	AesKey                string
}

type Redis struct {
	Host     string
	Port     string
	Password string
}

func NewConfigs() *Configs {
	return &Configs{
		App: Gin{
			Host: "localhost",
			Port: "8080",
		},
		Auth: Auth{
			JwtAccessSecret:       MustGetenv("JWT_ACCESS_SECRET"),
			JwtRefreshSecret:      MustGetenv("JWT_REFRESH_SECRET"),
			AccessTokenExpiresIn:  300,
			RefreshTokenExpiresIn: 604800,
			VerificationExpiresIn: 54000,
			AesKey:                MustGetenv("AES_KEY"),
		},
		Redis: Redis{
			Host:     MustGetenv("REDIS_HOST"),
			Port:     MustGetenv("REDIS_PORT"),
			Password: MustGetenv("REDIS_PASSWORD"),
		},
	}
}

func MustGetenv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("missing env var %s", key)
	}
	return v
}
