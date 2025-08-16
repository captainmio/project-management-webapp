package initializers

import (
	"fmt"
	"os"

	"time"

	"github.com/captainmio/project-management-app/backend/controllers/auth"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Routes() {
	fmt.Println("======= INITIALIZING ROUTES =======")
	router := gin.Default()

	// Allow CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// AUTH api
	router.POST("/api/auth/sign-up", auth.SignUp)

	port := os.Getenv("PORT")

	fmt.Println("post value:", port)
	if port == "" {
		port = "8080"
	}
	router.Run(":" + port)

}
