# URL Shortener Project

This is Bcrypt password hashing project with allows user to login and register with username and password and it hashes the password with bcrypt library first and then save into the database.

## Features

- Hash password using bcrypt.
- Verify the password with bcrypt.
- displays if the user entered wrong password or user doesnt exists or username taken etc errors gracefully.

## Installation

1. Clone the repository: `https://github.com/Sunilvishyt/nodejs-learning-and-projects`
2. Go the the url shortner directory: `cd jwt_authentication`
3. create .env file in the in the url-shortner directory with you database key : `DATABASE_URL="your-mongodb-url"`
4. Install the dependencies: `npm install`
5. Start the server: `npm run dev`

## Usage

1. Open your web browser and go to `http://localhost:8000`
2. go the the /auth/register to register yourself
3. you will se messages if the username is taken or not and see success message on successfull register
4. then go to /auth/login to login with the registered username and password see the messages about if the user exists or not or the password is wrong or login was a success.
5. view the list of shortened URLs, under the "short urls" heading.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
