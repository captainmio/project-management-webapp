package auth

import "golang.org/x/crypto/bcrypt"

/**
Function that handles hasing of password
@param password string
@return string: hanshed version of the string, error
*/
func HashPassword(password string) (string, error) {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}
	return string(hashedBytes), nil
}
