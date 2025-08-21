package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/captainmio/project-management-app/backend/helpers/auth"
	"github.com/gin-gonic/gin"
)

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get token from Authorization header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Authorization header format"})
			c.Abort()
			return
		}

		tokenString := parts[1]
		jwtSecret := []byte(os.Getenv("JWT_SECRET_KEY"))

		// Parse into MapClaims
		claims, err := auth.ValidateToken(tokenString, jwtSecret)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Error validating token"})
			c.Abort()
			return
		}

		// Extract your custom claims
		subject, _ := claims["Subject"].(float64) // jwt lib encodes numbers as float64
		email, _ := claims["Email"].(string)

		// Store in Gin context
		c.Set("userID", uint(subject)) // cast to uint/int64 if needed
		c.Set("email", email)

		c.Next()
	}
}
