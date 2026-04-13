# Backend API Documentation

## Endpoints

### POST /api/users/register

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