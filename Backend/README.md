# Backend API Documentation

## Endpoints

### POST /users/register

#### Description

This endpoint is used to register a new user. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

#### Request Body

The following fields are required in the request body:

- **email** (string): A valid email address.
- **fullName** (object):
  - **firstName** (string): The first name of the user (minimum 3 characters).
  - **lastName** (string): The last name of the user (minimum 3 characters).
- **password** (string): A password with a minimum length of 6 characters.

Example:

```json
{
  "email": "example@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "password123"
}
```

#### Responses

- **201 Created**: The user was successfully registered.

  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<USER_ID>",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "example@example.com"
    }
  }
  ```

- **400 Bad Request**: Validation errors occurred.

  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **500 Internal Server Error**: An unexpected error occurred on the server.

### POST /users/login

#### Description

This endpoint is used to authenticate a user. It validates the input data, checks the provided credentials, and returns a JSON Web Token (JWT) upon successful authentication.

#### Request Body

The following fields are required in the request body:

- **email** (string): A valid email address.
- **password** (string): A password with a minimum length of 6 characters.

Example:

```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**: The user was successfully authenticated.

  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<USER_ID>",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "example@example.com"
    }
  }
  ```

- **400 Bad Request**: Validation errors occurred.

  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **401 Unauthorized**: Invalid email or password.

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

- **500 Internal Server Error**: An unexpected error occurred on the server.

### GET /users/profile

#### Description

This endpoint retrieves the profile of the authenticated user. The user must be logged in and provide a valid token for authentication.

#### Headers

- **Authorization** (string): A valid JWT token in the format `Bearer <token>`.

#### Responses

- **200 OK**: The user's profile was successfully retrieved.

  ```json
  {
    "_id": "<USER_ID>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "example@example.com"
  }
  ```

- **401 Unauthorized**: The user is not authenticated.

  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **500 Internal Server Error**: An unexpected error occurred on the server.

### GET /users/logout

#### Description

This endpoint logs out the authenticated user by clearing the authentication token and blacklisting it.

#### Headers

- **Authorization** (string): A valid JWT token in the format `Bearer <token>`.

#### Responses

- **200 OK**: The user was successfully logged out.

  ```json
  {
    "message": "Logout successful"
  }
  ```

- **401 Unauthorized**: The user is not authenticated.

  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **500 Internal Server Error**: An unexpected error occurred on the server.
