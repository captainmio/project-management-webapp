package auth

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func SignUp(c *gin.Context) {
	var requestBody struct {
		Email    string
		Name     string
		Password string
	}

	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	// check if email already exists
	// if exists, return error
	// checkEmailExists := database.DB.First() // This should be replaced with actual logic to check email existence

	fmt.Println("============= SIGN UP CALLED =============")
	fmt.Println(requestBody.Name)

}
