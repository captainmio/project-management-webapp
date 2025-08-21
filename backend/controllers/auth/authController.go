package auth

import (
	"errors"
	"net/http"

	"github.com/captainmio/project-management-app/backend/database"
	"github.com/captainmio/project-management-app/backend/helpers/auth"
	"github.com/captainmio/project-management-app/backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SignUp(c *gin.Context) {
	var requestBody struct {
		Email    string
		Name     string
		Password string
	}

	// Bind the request body to the struct
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{"success": false, "message": "Invalid request body"})
		return
	}

	checkEmail, err := GetUserByEmail(requestBody.Email)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Database error"})
		return
	}

	// Check if the email already exists
	// If checkEmail is not nil, it means the email already exists
	if checkEmail != nil {
		c.JSON(http.StatusConflict, gin.H{"success": false, "message": "Email already exists"})
		return
	}

	user := models.User{
		Name:     requestBody.Name,
		Email:    requestBody.Email,
		Password: requestBody.Password,
	}
	// Hash the password before saving it to the database
	hashedPassword, err := auth.HashPassword(user.Password)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Error hashing password"})
		return
	}
	// Set the hashed password back to the user struct
	user.Password = hashedPassword

	// Create the user in the database
	result := database.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Error creating user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    user,
	})
}

func Login(c *gin.Context) {
	var requestBody struct {
		Email    string
		Password string
	}

	// Bind the request body to the struct
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{"success": false, "message": "Invalid request body"})
		return
	}

	// Get the user from the database
	user, err := GetUserByEmail(requestBody.Email)
	if err != nil {
		c.JSON(400, gin.H{"success": false, "message": "Email does not exist"})
	}

	// Verify the password
	if err := auth.VerifyPassword(user.Password, requestBody.Password); err != nil {
		c.JSON(400, gin.H{"success": false, "message": "Incorrect Password"})
		return
	}

	// Generate the access token
	token, err := auth.GenerateAccessToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Error generating token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"token": token,
			"name":  user.Name,
			"email": user.Email,
		},
	})

}

func GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := database.DB.Where("email = ?", email).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		// no user found -> return nil but no error
		return nil, nil
	}
	if err != nil {
		// actual DB error
		return nil, err
	}
	return &user, nil
}
