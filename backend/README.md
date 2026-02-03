# Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

## Installation

1. **Clone the repository:**
  ```bash
  git clone https://github.com/JordanRD/TeamAssignment_SpecializedPlatformDev_S30.git
  cd backend
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Create environment file:**
  ```bash
  cp .env.example .env
  ```

4. **Configure `.env` file:**
  ```
  MONGODB_URI=<mongodb://...>
  PORT=5000
  JWT_SECRET=your_super_secret_jwt_key_here
  NODE_ENV=development
  ```

## Running the Server

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will be available at `http://localhost:5000`

## MongoDB Setup

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas (Cloud):**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Troubleshooting

- **Port already in use:** Change `PORT` in `.env`
- **MongoDB connection failed:** Verify MongoDB is running
- **JWT errors:** Ensure `JWT_SECRET` is set in `.env`

---

# API Documentation

This is a complete backend API for an e-commerce platform built with Node.js, Express, and MongoDB.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Table of Contents

1. [User Authentication](#user-authentication)
2. [Products](#products)
3. [Cart](#cart)
4. [Orders](#orders)

---

## User Authentication

### Register New User

**Endpoint:** `POST /api/users/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

### Login User

**Endpoint:** `POST /api/users/login`

**Description:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

## Products

### Get All Products

**Endpoint:** `GET /api/products`

**Description:** Retrieve all available products

**Authentication:** Not required

**Response (200 OK):**
```json
[
  {
    "_id": "607f1f77bcf86cd799439012",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "image": "https://example.com/laptop.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "607f1f77bcf86cd799439013",
    "name": "Mouse",
    "description": "Wireless mouse",
    "price": 29.99,
    "category": "Accessories",
    "image": "https://example.com/mouse.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/products
```

---

### Get Single Product

**Endpoint:** `GET /api/products/:id`

**Description:** Get details of a specific product

**Authentication:** Not required

**URL Parameters:**
- `id` (string, required): Product ID

**Response (200 OK):**
```json
{
  "_id": "607f1f77bcf86cd799439012",
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category": "Electronics",
  "image": "https://example.com/laptop.jpg",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/products/607f1f77bcf86cd799439012
```

---

### Create Product

**Endpoint:** `POST /api/products`

**Description:** Create a new product (Admin only)

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Keyboard",
  "description": "Mechanical keyboard with RGB",
  "price": 149.99,
  "category": "Accessories",
  "image": "https://example.com/keyboard.jpg"
}
```

**Response (201 Created):**
```json
{
  "_id": "607f1f77bcf86cd799439014",
  "name": "Keyboard",
  "description": "Mechanical keyboard with RGB",
  "price": 149.99,
  "category": "Accessories",
  "image": "https://example.com/keyboard.jpg",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Keyboard",
    "description": "Mechanical keyboard with RGB",
    "price": 149.99,
    "category": "Accessories",
    "image": "https://example.com/keyboard.jpg"
  }'
```

---

### Update Product

**Endpoint:** `PUT /api/products/:id`

**Description:** Update product details

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): Product ID

**Request Body:**
```json
{
  "name": "Keyboard Pro",
  "price": 159.99
}
```

**Response (200 OK):**
```json
{
  "_id": "607f1f77bcf86cd799439014",
  "name": "Keyboard Pro",
  "description": "Mechanical keyboard with RGB",
  "price": 159.99,
  "category": "Accessories",
  "image": "https://example.com/keyboard.jpg",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:5000/api/products/607f1f77bcf86cd799439014 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Keyboard Pro",
    "price": 159.99
  }'
```

---

### Delete Product

**Endpoint:** `DELETE /api/products/:id`

**Description:** Delete a product

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): Product ID

**Response (200 OK):**
```json
{
  "message": "Product deleted"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/products/607f1f77bcf86cd799439014 \
  -H "Authorization: Bearer <TOKEN>"
```

---

## Cart

### Get User's Cart

**Endpoint:** `GET /api/cart`

**Description:** Retrieve all items in the current user's cart

**Authentication:** Required

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "product": {
      "_id": "607f1f77bcf86cd799439012",
      "name": "Laptop",
      "price": 999.99,
      "description": "High-performance laptop",
      "category": "Electronics",
      "image": "https://example.com/laptop.jpg"
    },
    "quantity": 1
  },
  {
    "_id": "507f1f77bcf86cd799439016",
    "product": {
      "_id": "607f1f77bcf86cd799439013",
      "name": "Mouse",
      "price": 29.99,
      "description": "Wireless mouse",
      "category": "Accessories",
      "image": "https://example.com/mouse.jpg"
    },
    "quantity": 2
  }
]
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer <TOKEN>"
```

---

### Add Product to Cart

**Endpoint:** `POST /api/cart`

**Description:** Add a product to cart or increase quantity if already in cart

**Authentication:** Required

**Request Body:**
```json
{
  "productId": "607f1f77bcf86cd799439012",
  "quantity": 1
}
```

**Response (201 Created):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "product": {
      "_id": "607f1f77bcf86cd799439012",
      "name": "Laptop",
      "price": 999.99,
      "description": "High-performance laptop",
      "category": "Electronics",
      "image": "https://example.com/laptop.jpg"
    },
    "quantity": 1
  }
]
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "607f1f77bcf86cd799439012",
    "quantity": 1
  }'
```

---

### Update Cart Item Quantity

**Endpoint:** `PUT /api/cart/:productId`

**Description:** Update quantity of a product in cart. Set quantity to 0 or negative to remove.

**Authentication:** Required

**URL Parameters:**
- `productId` (string, required): Product ID

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "product": {
      "_id": "607f1f77bcf86cd799439012",
      "name": "Laptop",
      "price": 999.99,
      "description": "High-performance laptop",
      "category": "Electronics",
      "image": "https://example.com/laptop.jpg"
    },
    "quantity": 3
  }
]
```

**cURL Example:**
```bash
curl -X PUT http://localhost:5000/api/cart/607f1f77bcf86cd799439012 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 3
  }'
```

---

### Remove Product from Cart

**Endpoint:** `DELETE /api/cart/:productId`

**Description:** Remove a product from the cart

**Authentication:** Required

**URL Parameters:**
- `productId` (string, required): Product ID to remove

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439016",
    "product": {
      "_id": "607f1f77bcf86cd799439013",
      "name": "Mouse",
      "price": 29.99,
      "description": "Wireless mouse",
      "category": "Accessories",
      "image": "https://example.com/mouse.jpg"
    },
    "quantity": 2
  }
]
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/cart/607f1f77bcf86cd799439012 \
  -H "Authorization: Bearer <TOKEN>"
```

---

### Checkout (Create Order from Cart)

**Endpoint:** `POST /api/cart/checkout`

**Description:** Convert cart items to an order and clear the cart

**Authentication:** Required

**Request Body:**
```json
{}
```

**Response (201 Created):**
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "607f1f77bcf86cd799439020",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "_id": "607f1f77bcf86cd799439021",
        "product": {
          "_id": "607f1f77bcf86cd799439012",
          "name": "Laptop",
          "description": "High-performance laptop",
          "price": 999.99,
          "category": "Electronics",
          "image": "https://example.com/laptop.jpg"
        },
        "quantity": 1,
        "price": 999.99
      }
    ],
    "totalPrice": 999.99,
    "status": "pending",
    "createdAt": "2024-01-15T10:35:00Z",
    "updatedAt": "2024-01-15T10:35:00Z"
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/cart/checkout \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json"
```

---

## Orders

### Get All User Orders

**Endpoint:** `GET /api/orders`

**Description:** Retrieve all orders for the current user

**Authentication:** Required

**Response (200 OK):**
```json
{
  "message": "Orders retrieved successfully",
  "count": 2,
  "data": [
    {
      "_id": "607f1f77bcf86cd799439020",
      "user": "507f1f77bcf86cd799439011",
      "items": [
        {
          "_id": "607f1f77bcf86cd799439021",
          "product": {
            "_id": "607f1f77bcf86cd799439012",
            "name": "Laptop",
            "description": "High-performance laptop",
            "price": 999.99,
            "category": "Electronics",
            "image": "https://example.com/laptop.jpg"
          },
          "quantity": 1,
          "price": 999.99
        }
      ],
      "totalPrice": 999.99,
      "status": "processing",
      "createdAt": "2024-01-15T10:35:00Z",
      "updatedAt": "2024-01-15T10:36:00Z"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer <TOKEN>"
```

---

### Get Single Order

**Endpoint:** `GET /api/orders/:orderId`

**Description:** Get details of a specific order

**Authentication:** Required

**URL Parameters:**
- `orderId` (string, required): Order ID

**Response (200 OK):**
```json
{
  "message": "Order retrieved successfully",
  "data": {
    "_id": "607f1f77bcf86cd799439020",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "_id": "607f1f77bcf86cd799439021",
        "product": {
          "_id": "607f1f77bcf86cd799439012",
          "name": "Laptop",
          "description": "High-performance laptop",
          "price": 999.99,
          "category": "Electronics",
          "image": "https://example.com/laptop.jpg"
        },
        "quantity": 1,
        "price": 999.99
      }
    ],
    "totalPrice": 999.99,
    "status": "processing",
    "createdAt": "2024-01-15T10:35:00Z",
    "updatedAt": "2024-01-15T10:36:00Z"
  }
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/orders/607f1f77bcf86cd799439020 \
  -H "Authorization: Bearer <TOKEN>"
```

---

### Update Order Status

**Endpoint:** `PUT /api/orders/:orderId`

**Description:** Update the status of an order

**Authentication:** Required

**URL Parameters:**
- `orderId` (string, required): Order ID

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Valid Status Values:**
- `pending`
- `processing`
- `shipped`
- `delivered`

**Response (200 OK):**
```json
{
  "message": "Order status updated successfully",
  "data": {
    "_id": "607f1f77bcf86cd799439020",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "_id": "607f1f77bcf86cd799439021",
        "product": {
          "_id": "607f1f77bcf86cd799439012",
          "name": "Laptop",
          "description": "High-performance laptop",
          "price": 999.99,
          "category": "Electronics",
          "image": "https://example.com/laptop.jpg"
        },
        "quantity": 1,
        "price": 999.99
      }
    ],
    "totalPrice": 999.99,
    "status": "shipped",
    "createdAt": "2024-01-15T10:35:00Z",
    "updatedAt": "2024-01-15T10:37:00Z"
  }
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:5000/api/orders/607f1f77bcf86cd799439020 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped"
  }'
```

---

### Get All Orders (Admin Only)

**Endpoint:** `GET /api/orders/admin/all`

**Description:** Retrieve all orders from all users (admin access only)

**Authentication:** Required

**Response (200 OK):**
```json
{
  "message": "All orders retrieved successfully",
  "count": 5,
  "data": [
    {
      "_id": "607f1f77bcf86cd799439020",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "items": [
        {
          "_id": "607f1f77bcf86cd799439021",
          "product": {
            "_id": "607f1f77bcf86cd799439012",
            "name": "Laptop",
            "description": "High-performance laptop",
            "price": 999.99,
            "category": "Electronics",
            "image": "https://example.com/laptop.jpg"
          },
          "quantity": 1,
          "price": 999.99
        }
      ],
      "totalPrice": 999.99,
      "status": "processing",
      "createdAt": "2024-01-15T10:35:00Z",
      "updatedAt": "2024-01-15T10:36:00Z"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/orders/admin/all \
  -H "Authorization: Bearer <TOKEN>"
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
```json
{
  "message": "Error description here"
}
```

**401 Unauthorized:**
```json
{
  "message": "Authorization required"
}
```

**403 Forbidden:**
```json
{
  "message": "Unauthorized access"
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Error description here"
}
```

---

## Quick Start Guide

1. **Register a user:**
   ```bash
   curl -X POST http://localhost:5000/api/users/register \
     -H "Content-Type: application/json" \
     -d '{"name":"John","email":"john@example.com","password":"pass123"}'
   ```

2. **Login to get token:**
   ```bash
   curl -X POST http://localhost:5000/api/users/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com","password":"pass123"}'
   ```

3. **Get all products:**
   ```bash
   curl -X GET http://localhost:5000/api/products
   ```

4. **Add product to cart:**
   ```bash
   curl -X POST http://localhost:5000/api/cart \
     -H "Authorization: Bearer <YOUR_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"productId":"<PRODUCT_ID>","quantity":1}'
   ```

5. **Checkout:**
   ```bash
   curl -X POST http://localhost:5000/api/cart/checkout \
     -H "Authorization: Bearer <YOUR_TOKEN>" \
     -H "Content-Type: application/json"
   ```

6. **View your orders:**
   ```bash
   curl -X GET http://localhost:5000/api/orders \
     -H "Authorization: Bearer <YOUR_TOKEN>"
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
```

---

## Notes

- All timestamps are in ISO 8601 format
- Authentication tokens expire after 24 hours
- Cart data is stored per user
- Orders are immutable once created
- Order status can be updated to: pending, processing, shipped, delivered
