<h1 align="center">🚀E-Commerce system🚀</h1>
<hr>
<h2>Introduction🙏</h2>
<h4>This project is an ecommerce system developed using Node.js, Express, and MongoDB. It provides APIs for CRUD operations to manage products and their variants. Each product can have multiple variants.</h4>
<hr>

## Features:😎

- Create, Read, Update, and Delete (CRUD) operations for products
- Create, Read, Update, and Delete (CRUD) operations for variants
- Search functionality to search for products by name, description, or variant name
- RESTful API architecture
- MongoDB database for data storage
  
<hr>

## Technologies Used:🧩

- Node.Js
- Express.Js
- MongoDB
- Jest
- Supertest

<hr>

## Installation Instructions:💻
<b>1. Clone the repository:</b>
   ```sh
     git clone git@github.com:BeingPratham/Ecommerce-crud.git

   ```

<b>2. Install dependencies:</b>
   ```sh
     npm install
   ```

<b>3. Set up MongoDB:</b>

  - Install MongoDB if not already installed: <a href="https://www.mongodb.com/try/download/community">MongoDB Installation Guide<a>
  - Start MongoDB service

<b>4. Set up environment variables:</b>

  - Create a .env file in the root directory
  - Define the following environment variables:

  ```sh
    PORT = 3000
    MONGO_URI = "mongodb://0.0.0.0:27017/Ecommerce"
  ```
<b>5. Start the server:</b>

  ```sh
    npm start
  ```

<hr>

<h2>Usage Instructions:</h2>

- Once the server is running, you can use tools like Postman or curl to interact with the APIs.
- Use the provided API endpoints to perform CRUD operations on products and variants.

<hr>

<h2>Endpoints/API Documentation:🔥</h2>

- <b>POST /createProduct</b> :- Create a new product
- <b>POST /createVariant/:productid</b> :- Create a new variant for a product
- <b>GET /getAllProduct</b> :- Get all products
- <b>GET /getProductVariants/:productid</b> :- Get variants of a product
- <b>PUT /updateProduct/:productid</b> :- Update a product
- <b>PUT /updateVariant/:variantid</b> :- Update a variant
- <b>DELETE /deleteProduct/:productid</b> :- Delete a product and its associated variants
- <b>DELETE /deleteVariant/:variantid</b> :- Delete a variant
- <b>GET /search?q=search_text</b> :- Search for products by name, description, or variant name

<hr>

##  Testing:

- To test this i have written all the test cases you will have to change the ids of the endpoint as i have written id according to my database.
- So change productId, variantId to update and delete particular items and to test it.
- After updating test according to you now you can run this command:-

```sh
  npm run test
```

<hr>

## Models Used for database:

- I have used two models Product and variant

### Product Model:

| Field          | Type     | Description                |
| -------------- | -------- | -------------------------- |
| _id            | ObjectId | Unique identifier          |
| name           | String   | Name of the product        |
| description    | String   | Description of the product |
| price          | Number   | Price of the product       |

### Variant Model:

| Field            | Type     | Description                           |
| ---------------- | -------- | ------------------------------------- |
| _id              | ObjectId | Unique identifier                     |
| name             | String   | Name of the variant                   |
| sku              | String   | Stock Keeping Unit (SKU),(Unique)     |
| additional_cost  | Number   | Additional cost compared to base cost |
| stock_count      | Number   | Stock count of the variant            |
| productId        | ObjectId | Reference to the parent product       |

- sku is unique id as stock keeping unit should be treat as unique identifier so if you get an error in variant api then check your sku if its unique or not.

<hr>

<h1 align="center">💥Thank You💥</h1>

<hr>




