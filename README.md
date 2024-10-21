# Bookstore API

This is a Bookstore API built using Node.js. It provides functionality to manage books, orders, and user authentication (including admin access).

## Features

- Add, update, delete, and view books.
- Place orders and view order details by email.
- User signup, login, and admin creation.
- JWT authentication for secured routes.

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm (v6 or above)
- Postman (optional, for testing API endpoints)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shrikant3004/Book-Store-API.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Book-Store-API
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

### Running the API

To start the API server:

```bash
npm start
```

The API will run on `http://localhost:3000` by default.

## API Endpoints

### Books

- **POST** `/api/book`: Add a new book.
- **GET** `/api/book`: Get a list of all books.
- **PATCH** `/api/book`: Update a book.
- **DELETE** `/api/book`: Delete a book.

#### Book Schema (for POST `/api/book`):

```json
{
  "title": "How to Grow Your Online Store",
  "description": "Learn the best strategies to grow your online store in today's competitive market.",
  "category": "business",
  "trending": true,
  "coverImage": "book-1.png",
  "oldPrice": 29.99,
  "newPrice": 19.99
}
```

### Orders

- **POST** `/api/order`: Place a new order.
- **GET** `/api/order/:email`: View orders by user email.

#### Order Schema (for POST `/api/order`):

```json
{
  "name": "Shrikant",
  "email": "john.doe1@example.com",
  "address": {
    "city": "New York",
    "country": "USA",
    "state": "NY",
    "zipcode": "10001"
  },
  "phone": 1234567890,
  "productIds": [
    "6713c57f2b947164316b2c8f"
  ],
  "totalPrice": 150.75
}
```

### User

- **POST** `/api/signup`: User signup.
- **POST** `/api/login`: User login.
- **POST** `/api/admin`: Admin creation (requires authentication).

### Authentication

- JWT (JSON Web Token) is used to authenticate users. After successful login or admin creation, you will receive a token in the response.
- Include the token in the `Authorization` header for protected routes like `/api/book` and `/api/order`.

### Testing the API with Postman

1. **Signup and Login**:
   - Create an account using `POST /api/signup`.
   - Login using `POST /api/login` to get a JWT token.

2. **Authorization**:
   - For secured endpoints (e.g., adding, updating, or deleting books), include the token in the headers:
     ```
     Authorization: Bearer <your-token-here>
     ```

3. **Add Book Example**:

   - **POST** `/api/book` with the following JSON:

     ```json
     {
       "title": "How to Grow Your Online Store",
       "description": "Learn the best strategies to grow your online store in today's competitive market.",
       "category": "business",
       "trending": true,
       "coverImage": "book-1.png",
       "oldPrice": 29.99,
       "newPrice": 19.99
     }
     ```

4. **Place Order Example**:

   - **POST** `/api/order` with the following JSON:

     ```json
     {
       "name": "Shrikant",
       "email": "john.doe1@example.com",
       "address": {
         "city": "New York",
         "country": "USA",
         "state": "NY",
         "zipcode": "10001"
       },
       "phone": 1234567890,
       "productIds": [
         "6713c57f2b947164316b2c8f"
       ],
       "totalPrice": 150.75
     }
     ```
