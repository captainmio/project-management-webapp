package auth

import (
	"os"
	"time"

	"github.com/captainmio/project-management-app/backend/models"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

/*
*
Function that handles hasing of password
@param password string
return string: hanshed version of the string, error
*/
func HashPassword(password string) (string, error) {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}
	return string(hashedBytes), nil
}

/*
*
Function that verifies the password against the hashed password
@param hashedPassword string: the hashed password
return: bool
*/
func VerifyPassword(hashedPassword, providedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(providedPassword))
}

func GenerateAccessToken(user *models.User) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)

	// Create the JWT claims
	claims := jwt.MapClaims{
		"Subject":   user.ID,    // subject (user ID)
		"Email":     user.Email, // custom claim
		"ExpiresAt": jwt.NewNumericDate(expirationTime),
		"IssuedAt":  jwt.NewNumericDate(time.Now()),
	}

	// Create the token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))

	if err != nil {
		return "", err
	}

	return tokenString, nil

}
