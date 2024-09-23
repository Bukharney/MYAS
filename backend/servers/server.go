package servers

import (
	"errors"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/scrapper"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

type Server struct {
	App        *gin.Engine
	Cfg        *configs.Configs
	Redis      *redis.Client
	Playwright *scrapper.Playwright
}

func NewServer(cfg *configs.Configs, redis *redis.Client) *Server {
	return &Server{
		App:        gin.Default(),
		Cfg:        cfg,
		Redis:      redis,
		Playwright: scrapper.NewPlaywright(),
	}
}

func (s *Server) Run() error {
	//gin.SetMode(gin.ReleaseMode)
	s.App.Use(cors.New(
		cors.Config{
			AllowOrigins:     []string{"*"},
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
			AllowCredentials: true,
		},
	))

	err := s.MapHandlers()
	if err != nil {
		return errors.New("failed to map handlers")
	}

	err = s.App.Run(
		":" + s.Cfg.App.Port,
	)
	if err != nil {
		return errors.New("failed to run server")
	}

	return nil
}
