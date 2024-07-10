package controllers

import (
	"strconv"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/middlewares"
	"github.com/Bukharney/go-scrapper/modules/entities"
	"github.com/gin-gonic/gin"
)

type AssignmentsController struct {
	Cfg                *configs.Configs
	AssignmentsUsecase entities.AssignmentsUsecase
}

func NewAssignmentsController(r gin.IRoutes, cfg *configs.Configs, assignmentsUsecase entities.AssignmentsUsecase) {
	AssignmentsController := &AssignmentsController{
		Cfg:                cfg,
		AssignmentsUsecase: assignmentsUsecase,
	}

	r.GET("/", middlewares.JwtAuthentication(cfg), AssignmentsController.GetAssignments)
	r.GET("/no-login", AssignmentsController.GetAssignmentsNoLogin)
}

func (c *AssignmentsController) GetAssignmentsNoLogin(ctx *gin.Context) {
	var user entities.UserData
	u, p, ok := ctx.Request.BasicAuth()
	if !ok {
		ctx.JSON(401, gin.H{"error": "Unauthorized"})
		return
	}

	id, err := strconv.Atoi(u)
	if err != nil {
		ctx.JSON(400, gin.H{"error": "Invalid user ID"})
		return
	}

	user.UserID = int(id)
	user.Password = p

	assignments, code, err := c.AssignmentsUsecase.GetAssignmentsNoLogin(ctx, user)
	if err != nil {
		ctx.JSON(code, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(code, assignments)
}

func (c *AssignmentsController) GetAssignments(ctx *gin.Context) {
	assignments, code, err := c.AssignmentsUsecase.GetAssignments(ctx)
	if err != nil {
		ctx.JSON(code, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(code, assignments)
}
