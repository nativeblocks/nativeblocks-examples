package app

type User struct {
	ID      int
	Country string
}

type UserRepository interface {
	GetUsers() ([]User, error)
}

func GetUsers() ([]User, error) {
	users := make([]User, 0)
	users = append(users, User{ID: 1, Country: "USA"})
	users = append(users, User{ID: 2, Country: "USA"})
	users = append(users, User{ID: 3, Country: "Canada"})
	users = append(users, User{ID: 4, Country: "Türkiye"})
	users = append(users, User{ID: 5, Country: "Türkiye"})
	return users, nil
}
