# [PT Primac Perkasa Indonesia] Technical Test - BE User Auth with Express

Author: Alfarell Muchamad Yuwanto

Backend service for the **Vue 3 Auth App**, built with **Express.js**.  
Implements user registration, login, authentication via JWT, and profile retrieval.

## Tech Stack

- [Express JS](https://expressjs.com/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## Setup & Installation

```bash
# Setup .env

cp .env.example .env
```

Fill the `JWT_SECRET`, `JWT_EXPIRES_IN`, `BCRYPT_SALT_ROUNDS` variables inside the .env file

- `JWT_SECRET`: String (utf-8 encoded) secret key
- `JWT_EXPIRES_IN`: Durtation of jwt token expires (in seconds)
- `BCRYPT_SALT_ROUNDS`: Number of hashing iteration to hash the password with bcrypt

```bash
# Install dependencies

npm install
```

```bash
# Run server

npm start
```

```bash
# Or run development server with nodemon to automatically restart on file changes

npm run dev
```

## API Endpoints

- `[GET] /api/auth/user`

  response:

  ```json
  {
    "id": "uuid",
    "name": "string",
    "username": "string",
    "email": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```

- `[POST] /register`

  body payload:

  ```json
  {
    "name": "string",
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

  response:

  ```json
  {
    "userId": "string"
  }
  ```

- `[POST] /login`

  body payload:

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

  response:

  ```json
  {
    "accessToken": "string",
    "expiredIn": "string",
    "duration": "number",
    "user": {
      "name": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```
