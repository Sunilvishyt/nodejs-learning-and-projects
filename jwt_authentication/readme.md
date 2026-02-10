# JWT Authentication Project

This project is a simple JWT (JSON Web Token) authentication system built with Node.js, Express, and MongoDB. It allows users to register, log in, and access protected routes using JWTs for authentication.

## Features

- User registration with email and password
- User login with email and password
- JWT generation and verification
- Protected routes that require authentication

## Installation

1. Clone the repository: `git clone https://github.com/Sunilvishyt/nodejs-learning-and-projects.git`

2. Navigate to the project directory: `cd nodejs-learning-and-projects/jwt_authentication`
   3.create .env file in the jwt_authentication folder with these values -
   `MONGODB_URL="your-mongodb-key "`
   `SECRET_KEY="create-any-secret-key"`

3. Install the dependencies:
   `npm install`
4. Start the server:
   `npm start`

## Usage

1. Open your web browser and go to `http://localhost:8000`
2. If you are not logged in and try to access a protected route, you will be redirected to the login page.
3. Register a new account or log in with an existing account.
4. Once logged in, you can access protected routes.
5. To log out, simply click the logout button, which will clear the JWT from your cookies.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [EJS](https://ejs.co/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
