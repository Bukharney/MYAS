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

func (r *AuthRepo) GetUserById(userId int) (entities.UserData, error) {
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

func (r *AuthRepo) SetUser(user entities.UserData) error {
	data, err := json.Marshal(user)
	if err != nil {
		return err
	}
	err = r.Redis.Set(context.Background(), strconv.Itoa(user.UserID), data,
		time.Duration(r.Cfg.Auth.RefreshTokenExpiresIn*int(time.Second))).Err()
	if err != nil {
		return err
	}

	return nil
}

func (r *AuthRepo) UpdateUser(userData entities.UserData) error {
	user, err := r.GetUserById(userData.UserID)
	if err != nil {
		return err
	}

	user.RefreshToken = userData.RefreshToken
	err = r.SetUser(user)
	if err != nil {
		return err
	}

	return nil
}

func (r *AuthRepo) DeleteUserById(userId int) error {
	err := r.Redis.Del(context.Background(), strconv.Itoa(userId)).Err()
	if err != nil {
		return err
	}

	return nil
}
