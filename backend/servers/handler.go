package servers

import (
	"net/http"

	"github.com/Bukharney/go-scrapper/modules/controllers"
	"github.com/Bukharney/go-scrapper/modules/repositories"
	"github.com/Bukharney/go-scrapper/modules/usecases"

	"github.com/gin-gonic/gin"
)

func (s *Server) MapHandlers() error {
	v1 := s.App.Group("/v1")
	authGroup := v1.Group("/auth")
	assignment := v1.Group("/assignment")

	authRepo := repositories.NewAuthRepo(s.Cfg, s.Redis)

	authUsecase := usecases.NewAuthUsecase(s.Cfg, authRepo)
	assignmentUsecase := usecases.NewAssignmentsUsecase(s.Cfg, authRepo)

	controllers.NewAuthController(authGroup, s.Cfg, authUsecase)
	controllers.NewAssignmentsController(assignment, s.Cfg, assignmentUsecase)

	s.App.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"message": "Path Not Found"})
	})

	return nil
}
