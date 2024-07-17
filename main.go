package main

import (
	"log"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/database"
	"github.com/Bukharney/go-scrapper/servers"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env")

	cfg := configs.NewConfigs()

	redis, err := database.RedisConnect(cfg)
	if err != nil {
		log.Fatal(err)
	}

	srv := servers.NewServer(cfg, redis)
	err = srv.Run()
	if err != nil {
		log.Fatal(err)
	}
}
