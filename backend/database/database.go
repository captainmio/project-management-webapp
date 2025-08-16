package database

import (
	"log"
	"os"

	"github.com/captainmio/project-management-app/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDatabase() {
	var err error
	dsn := os.Getenv("CONNECTION_STRING")

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect to database")
	}

	DB.AutoMigrate(&models.User{})

	log.Println("============= Connected to the database successfully =============")
}
