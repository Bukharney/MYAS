package database

import (
	"context"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/utils"
	"github.com/redis/go-redis/v9"
)

func RedisConnect(cfg *configs.Configs) (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     cfg.Redis.Host + ":" + cfg.Redis.Port,
		Password: cfg.Redis.Password,
		DB:       0,
	})

	_, err := client.Ping(context.Background()).Result()
	if err != nil {
		return nil, err
	}

	utils.LogWithPrefix("[REDIS] ", "Connected to Redis")

	return client, nil
}
