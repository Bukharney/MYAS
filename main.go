package main

import (
	"fmt"
	"log"

	"github.com/Bukharney/go-scrapper/scrapper"
)

func main() {
	username := ""
	password := ""
	assignments, err := scrapper.ScrapeAssignments(username, password)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	fmt.Printf("Assignments: %+v\n", assignments)
}
