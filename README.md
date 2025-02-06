# Customer API
A simple RESTful API for managing customers and their orders, built with Node.js, Express.js, and MongoDB using Mongoose.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [License](#license)

## Description
This API allows users to manage customer data and their orders efficiently. It is built using Node.js, Express.js, and MongoDB with Mongoose for database modeling. The API supports CRUD operations for customers and orders.

### Features:
- Fetch all customers
- Get a specific customer by ID
- Fetch an order by order ID
- Add a new customer
- Update customer details
- Update order details
- Delete a customer

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14 or later)
- MongoDB (Local installation or use MongoDB Atlas)

### Steps to Run the Project Locally:
1. Clone the repository:
   ```sh
   git clone https://github.com/AminduBhashana/customer-api-node-express-mongodb.git
   ```
2. Navigate to the project directory:
   ```sh
   cd customer-api-node-express-mongodb
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   CONNECTION=your_mongodb_connection_string
   ```
5. Start the server:
   ```sh
   npm start
   ```
   The API should now be running at `http://localhost:3000`.

## Usage
You can interact with the API using tools like Postman or cURL.

## API Endpoints

- Get all customers ::  
**GET** `/api/customers`

- Get a specific customer by ID :: 
**GET** `/api/customers/:id`

- Get an order by order ID :: 
**GET** `/api/orders/:id`

- Add a new customer :: 
**POST** `/api/customers`

- Update a customer :: 
**PUT** `/api/customers/:id`

- Update an order :: 
**PATCH** `/api/orders/:id`

- Delete a customer :: 
**DELETE** `/api/customers/:id`


## License
This project is licensed under the MIT License.

