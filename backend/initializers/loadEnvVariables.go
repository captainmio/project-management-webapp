package initializers

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnvironmentVariables() {
	// This function is intended to load environment variables
	// from a .env file or similar configuration.
	// Implementation details would go here.

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

}
