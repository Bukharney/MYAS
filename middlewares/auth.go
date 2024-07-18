package middlewares

import (
	"net/http"

	"github.com/Bukharney/go-scrapper/configs"
	"github.com/Bukharney/go-scrapper/utils"
	"github.com/gin-gonic/gin"
)

func JwtAuthentication(cfg *configs.Configs) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenPart, err := utils.GetTokenPart(c)
		if err != nil {
			c.JSON(http.StatusForbidden, gin.H{
				"error": err.Error(),
			})
			c.Abort()
			return
		}

		if tokenPart.AccessToken == "" {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "No access token found",
			})
			c.Abort()
			return
		}

		token, _, err := utils.CheckToken(c, cfg, tokenPart.AccessToken, "access")
		if err != nil {
			c.JSON(http.StatusForbidden, gin.H{
				"error": err.Error(),
			})
			c.Abort()
			return
		}

		if !token.Valid {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "Invalid token",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
