package repositories

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/modules/entities"
	"github.com/redis/go-redis/v9"
)

type AuthRepo struct {
	Cfg   *configs.Configs
	Redis *redis.Client
}

func NewAuthRepo(cfg *configs.Configs, redis *redis.Client) entities.AuthRepository {
	return &AuthRepo{
		Redis: redis,
		Cfg:   cfg,
	}
}

func (r *AuthRepo) GetToken(userId int) (entities.UserData, error) {
	val, err := r.Redis.Get(context.Background(), strconv.Itoa(userId)).Result()
	if err != nil {
		return entities.UserData{}, fmt.Errorf("token not found")
	}

	var data entities.UserData
	err = json.Unmarshal([]byte(val), &data)
	if err != nil {
		return entities.UserData{}, err
	}

	return data, nil
}

func (r *AuthRepo) SetToken(token entities.UserData) error {
	data, err := json.Marshal(token)
	if err != nil {
		return err
	}
	err = r.Redis.Set(context.Background(), strconv.Itoa(token.UserID), data,
		time.Duration(r.Cfg.Auth.RefreshTokenExpiresIn*int(time.Second))).Err()
	if err != nil {
		return err
	}

	return nil
}

func (r *AuthRepo) UpdateToken(token entities.UserData) error {
	user, err := r.GetToken(token.UserID)
	if err != nil {
		return err
	}

	user.RefreshToken = token.RefreshToken
	err = r.SetToken(user)
	if err != nil {
		return err
	}
	return nil
}

func (r *AuthRepo) DeleteToken(userId int) error {
	err := r.Redis.Del(context.Background(), strconv.Itoa(userId)).Err()
	if err != nil {
		return err
	}

	return nil
}
