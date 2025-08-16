package main

import (
	"github.com/captainmio/project-management-app/backend/database"
	"github.com/captainmio/project-management-app/backend/initializers"
)

func init() {
	initializers.LoadEnvironmentVariables()
	database.ConnectToDatabase()
}

func main() {
	initializers.Routes()
}
