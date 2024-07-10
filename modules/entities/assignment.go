package entities

import (
	"github.com/Bukharney/go-scrapper/scrapper"
	"github.com/gin-gonic/gin"
)

type AssignmentsUsecase interface {
	GetAssignments(*gin.Context) ([]scrapper.ClassAssignments, int, error)
	GetAssignmentsNoLogin(*gin.Context, UserData) ([]scrapper.ClassAssignments, int, error)
}

type Assignment struct {
	Name       string
	Submission string
	DueDate    string
}

type ClassAssignments struct {
	ClassName   string
	Assignments []Assignment
}
