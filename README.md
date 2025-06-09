# 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** that allows users to sign up, log in, manage books, submit reviews, and search books. Authentication is handled using **JWT tokens**.

---

## 🚀 Features

- ✅ User Signup & Login (JWT-based)
- 📖 Add, view, and filter books
- ⭐ Submit, update, and delete book reviews (one per user per book)
- 🔍 Search books by title or author (partial & case-insensitive)
- 🧾 Pagination support on book listings and reviews
- 🔐 Auth middleware to protect sensitive routes

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Others:** dotenv, bcryptjs, cors

---
## ⚙️ Setup Instructions

### 1. Clone the repo
### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:
```bash
PORT=5000
MONGODB_URL=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret
```

### 4. Start the server
```bash
npm start
```

## 🧪 API Endpoints

### 🔐 Auth Routes

-   `POST /api/signup` – Register a user
    
-   `POST /api/login` – Log in & get JWT token

### 📚 Book Routes

-   `POST /api/books` – Add a book (auth required)
    
-   `GET /api/books` – List all books (pagination, filter by author/genre)
    
-   `GET /api/books/:id` – Get book details with average rating and reviews
-
### ⭐ Review Routes

-   `POST /api/books/:id/reviews` – Submit review (auth required, 1/user/book)
    
-   `PUT /api/reviews/:id` – Update your review
    
-   `DELETE /api/reviews/:id` – Delete your review
    

### 🔍 Search Route

-   `GET /api/search?query=someText` – Search books by title or author