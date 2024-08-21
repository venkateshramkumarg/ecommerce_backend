# eCommerce Backend System

Welcome to the eCommerce Backend System. This application provides a RESTful API for managing users, products, categories, orders, carts, payments, and reviews.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Admin](#admin)
  - [Users](#users)
  - [Products](#products)
  - [Categories](#categories)
  - [Orders](#orders)
  - [Carts](#carts)
  - [Payments](#payments)
  - [Reviews](#reviews)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/venkateshramkumarg/ecommerce_backend.git
    cd ecommerce-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database using Prisma:
    ```sh
    npx prisma migrate dev
    ```

4. Start the application:
    ```sh
    npm start
    ```

## Usage

The application runs on `http://localhost:3000/api`. You can use tools like Postman or curl to interact with the API.

## API Endpoints

### Admin

- **Create Admin**
    ```http
    POST /api/admin/create/admin/new
    ```
    **Request Body:**
    ```json
    {
      "user_name": "admin_name",
      "password": "password",
      "email": "admin@example.com"
    }
    ```

- **Delete Admin**
    ```http
    DELETE /api/admin/delete/admin/:name
    ```

- **Update Admin**
    ```http
    PUT /api/admin/update/admin/:name
    ```
    **Request Body:**
    ```json
    {
      "password": "new_password",
      "email": "new_email@example.com"
    }
    ```

### Users

- **Create User**
    ```http
    POST /api/users/create/user/new
    ```
    **Request Body:**
    ```json
    {
      "user_name": "user_name",
      "password": "password",
      "email": "user@example.com"
    }
    ```

- **Delete User**
    ```http
    DELETE /api/users/delete/user/:name
    ```

- **Update User**
    ```http
    PUT /api/users/update/user/:name
    ```
    **Request Body:**
    ```json
    {
      "password": "new_password",
      "email": "new_email@example.com"
    }
    ```

### Products

- **Create Product**
    ```http
    POST /api/products/addproduct
    ```
    **Request Body:**
    ```json
    {
      "user_name": "admin_name",
      "productName": "product_name",
      "description": "product_description",
      "price": "product_price",
      "stock": "product_stock",
      "categoryId": "category_id"
    }
    ```

- **Delete Product**
    ```http
    DELETE /api/products/deleteproduct/:id
    ```

- **Update Product**
    ```http
    PUT /api/products/updateproduct/:id
    ```
    **Request Body:**
    ```json
    {
      "productName": "new_product_name",
      "description": "new_product_description",
      "price": "new_product_price",
      "stock": "new_product_stock",
      "categoryId": "new_category_id"
    }
    ```

- **Get All Products**
    ```http
    GET /api/products/allproducts
    ```

- **Get Product by ID**
    ```http
    GET /api/products/uniqueproduct/:id
    ```

### Categories

- **Create Category**
    ```http
    POST /api/categories/add/category
    ```
    **Request Body:**
    ```json
    {
      "user_name": "admin_name",
      "categoryName": "category_name"
    }
    ```

- **Delete Category**
    ```http
    DELETE /api/categories/delete/category/:id
    ```

- **Update Category**
    ```http
    PUT /api/categories/update/category/:id
    ```
    **Request Body:**
    ```json
    {
      "categoryName": "new_category_name"
    }
    ```

- **Get All Categories**
    ```http
    GET /api/categories/allcategories
    ```

- **Get Category by ID**
    ```http
    GET /api/categories/uniquecategory/:id
    ```

### Orders

- **Create Order**
    ```http
    POST /api/orders/create/order
    ```
    **Request Body:**
    ```json
    {
      "user_name": "user_name",
      "productIds": ["product_id1", "product_id2"],
      "totalAmount": "total_amount",
      "shippingAddress": "shipping_address"
    }
    ```

- **Delete Order**
    ```http
    DELETE /api/orders/delete/order/:id
    ```

- **Update Order**
    ```http
    PUT /api/orders/update/order/:id
    ```
    **Request Body:**
    ```json
    {
      "status": "new_status"
    }
    ```

- **Get All Orders**
    ```http
    GET /api/orders
    ```

- **Get Order by ID**
    ```http
    GET /api/orders/:id
    ```

### Carts

- **Add to Cart**
    ```http
    POST /api/carts/addtocart
    ```
    **Request Body:**
    ```json
    {
      "user_name": "user_name",
      "productId": "product_id",
      "quantity": "quantity"
    }
    ```

- **Delete from Cart**
    ```http
    DELETE /api/carts/removefromcart/:id
    ```

- **Get User's Cart**
    ```http
    GET /api/carts/user/:name
    ```

### Payments

- **Process Payment**
    ```http
    POST /api/payments/processpayment
    ```
    **Request Body:**
    ```json
    {
      "user_name": "user_name",
      "orderId": "order_id",
      "paymentMethod": "payment_method"
    }
    ```

- **Get Payment Details**
    ```http
    GET /api/payments/paymentdetails/:paymentid
    ```

### Reviews

- **Add Review**
    ```http
    POST /api/reviews/addreview
    ```
    **Request Body:**
    ```json
    {
      "user_name": "user_name",
      "productId": "product_id",
      "rating": "rating",
      "comment": "comment"
    }
    ```

- **Delete Review**
    ```http
    DELETE /api/reviews/deletereview/:id
    ```

- **Update Review**
    ```http
    PUT /api/reviews/updatereview/:id
    ```
    **Request Body:**
    ```json
    {
      "rating": "new_rating",
      "comment": "new_comment"
    }
    ```

- **Get Reviews for Product**
    ```http
    GET /api/reviews/product/:id
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
DATABASE_URL="your-database-url"
