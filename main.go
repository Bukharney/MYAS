package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/database"
	"github.com/Bukharney/go-scrapper/servers"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

func MustGetenv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("missing env var %s", key)
	}
	return v
}

func RedisConnect() (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     MustGetenv("REDIS_HOST") + ":" + MustGetenv("REDIS_PORT"),
		Password: MustGetenv("REDIS_PASSWORD"),
		DB:       0,
	})

	_, err := client.Ping(context.Background()).Result()
	if err != nil {
		return nil, err
	}

	return client, nil
}

func SaveCredentials(db *redis.Client, username string, password string) error {
	err := db.Set(context.Background(), username, password, 7*24*time.Hour).Err()
	if err != nil {
		return err
	}
	return nil
}

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
