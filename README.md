

# 🛒 E-Market API

A complete RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** to manage products, categories, and users for an online marketplace.

---

## 🚀 Features

* 🧩 **Modular architecture** (Controllers, Routes, Models, Middlewares)
* 💾 **MongoDB connection** using Mongoose
* 👥 **User management** (CRUD)
* 🏷️ **Category management**
* 🛍️ **Product management**
* 🔍 **Search API** for filtering products by category, name, or price
* ⚙️ Custom middlewares for logging and error handling
* 🌿 Environment variables with dotenv

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB & Mongoose
* Dotenv
* Nodemon

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/e-market-api.git
cd e-market-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

### 4️⃣ Run the server

```bash
npm run dev
```

You should see:

```
Server running on port 3000
✅ MongoDB connected
```

---

## 🧩 API Endpoints

### 🛍️ Product Routes

| Method | Endpoint                              | Description                                        |
| ------ | ------------------------------------- | -------------------------------------------------- |
| GET    | `/api/products`                       | Get all products                                   |
| GET    | `/api/products/:id`                   | Get one product                                    |
| POST   | `/api/products`                       | Add new product                                    |
| PUT    | `/api/products/:id`                   | Update product                                     |
| DELETE | `/api/products/:id`                   | Delete product                                     |
| GET    | `/api/products/search/:type/:content` | Search products (by name, category, min/max price) |

---

### 🏷️ Category Routes

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/categories`     | Get all categories |
| GET    | `/api/categories/:id` | Get category by ID |
| POST   | `/api/categories`     | Add new category   |
| PUT    | `/api/categories/:id` | Update category    |
| DELETE | `/api/categories/:id` | Delete category    |

---

### 👥 User Routes

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/users`     | Get all users   |
| GET    | `/api/users/:id` | Get user by ID  |
| POST   | `/api/users`     | Create new user |
| DELETE | `/api/users/:id` | Delete user     |

---

## 🧩 Project Structure

```
E-Market-API/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── categoryController.js
│   ├── productController.js
│   └── userController.js
│
├── middlewares/
│   ├── errorHandler.js
│   ├── logger.js
│   └── notFound.js
│
├── models/
│   ├── Category.js
│   ├── Product.js
│   └── User.js
│
├── routes/
│   ├── categoryRouter.js
│   ├── productRoutes.js
│   └── userRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

## 🧪 Testing

Use **Postman** to test the API endpoints.

Example Product (POST `/api/products`)

```json
{
  "title": "Wireless Mouse",
  "description": "Ergonomic mouse with USB receiver",
  "price": 25.99,
  "stock": 50,
  "category": "68e6657c63f27acd6a29121a",
  "imageUrl": "https://example.com/mouse.jpg"
}
```

---

## 💡 Example Search Endpoint

| Example URL                                 | Description            |
| ------------------------------------------- | ---------------------- |
| `/api/products/search/name/mouse`           | Search by product name |
| `/api/products/search/category/electronics` | Search by category     |
| `/api/products/search/max/100`              | Search by max price    |
| `/api/products/search/min/10`               | Search by min price    |

---

## 📘 API Documentation (Swagger)

Once your server is running, open:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**
to view the full Swagger UI documentation.

---

## 👩‍💻 Author

**Meryem Litim**
📧 [litimmeryem2001@gmail.com]


