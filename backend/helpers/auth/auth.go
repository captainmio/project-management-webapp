package auth

import (
	"errors"
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

func ValidateToken(tokenString string, secret []byte) (jwt.MapClaims, error) {
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid token")
		}
		return secret, nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, errors.New("token expired")
		}
		return nil, errors.New("invalid token")
	}

	// Extract and validate claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, errors.New("invalid token")
}

func GenerateAccessToken(user *models.User) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)

	// Create the JWT claims
	claims := jwt.MapClaims{
		"sub":   user.ID,               // subject (user ID)
		"email": user.Email,            // custom claim
		"exp":   expirationTime.Unix(), // standard exp
		"iat":   time.Now().Unix(),     // standard iat
	}

	// Create the token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	secret := os.Getenv("JWT_SECRET_KEY")
	if secret == "" {
		return "", errors.New("JWT_SECRET_KEY is not set")
	}

	tokenString, err := token.SignedString([]byte(secret))

	return tokenString, err

}
