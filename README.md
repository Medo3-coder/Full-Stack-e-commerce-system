# 🛒 Full Stack E-commerce Test Project

This project is a simplified full-stack e-commerce system built using:

- **Laravel 12 (API backend)**
- **React.js (frontend using Vite)**
- **Laravel Sanctum (authentication)**
- **Material UI (styling)**

---

## 📦 Features

### Backend (Laravel 12)
- Products API with search, filters, and pagination
- Orders API with many-to-many product relationship
- Laravel Sanctum authentication
- Event system for order placement (simulated admin notification)
- Caching of product list for performance
- Input validation and error handling

### Frontend (React + Vite)
- Responsive, modern UI using Material UI
- Login page
- Product page with:
  - Filtering by name, price, category
  - Pagination
  - Add to cart and manage quantities
- Order summary and submission
- Order details view
- Auth token handling using Axios interceptors

---

## 🚀 Getting Started

## ⚙️ Backend Setup (Laravel)

### 1. Install Dependencies

```bash
composer install
```

### 2. Environment Config

```bash
cp .env.example .env
php artisan key:generate
```

### 3. Setup Database

In `.env`, set your DB details:

```
DB_DATABASE=your_db
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

Then run:

```bash
php artisan migrate --seed
```

### 4. Install Sanctum

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### 5. Seed Test User (optional)

Create a user manually or via tinker:

```bash
php artisan tinker
>>> \App\Models\User::create(['name' => 'Test User', 'email' => 'test@example.com', 'password' => bcrypt('password')]);
```

---

## 🎨 Frontend Setup (React + Vite)

### 1. Install NPM dependencies

```bash
npm install
```

### 2. Run the frontend

```bash
npm run dev
```

Make sure Laravel server is also running:

```bash
php artisan serve
```

---

## 🔐 Authentication Flow

* `POST /api/login` with email/password
* Store the token in `localStorage`
* Axios automatically attaches `Authorization: Bearer <token>` for authenticated requests
* Sanctum ensures secure access to `/products`, `/orders`, etc.

---

## 📘 API Documentation

### 🔑 Auth

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| POST   | `/api/login`  | Login & get token  |
| GET    | `/api/user`   | Authenticated user |
| POST   | `/api/logout` | Logout             |

### 📦 Products

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | `/api/products` | List all products with filters |

Params:

```
?search=apple&min_price=10&max_price=200&category=phones
```

### 🛒 Orders

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/api/orders`      | Place a new order  |
| GET    | `/api/orders/{id}` | View order details |

Body for placing an order:

```json
{
  "products": [
    { "id": 1, "quantity": 2 },
    { "id": 5, "quantity": 1 }
  ]
}


---

## 📂 Project Structure

```
ecommerce-test/
├── app/
│   └── Models, Events, Listeners, Controllers
├── routes/
│   └── api.php
├── resources/
│   └── js/              <-- React frontend
│       ├── pages/
│       ├── api/axios.js
│       ├── App.jsx
│       └── main.jsx
├── public/
├── vite.config.js
├── .env.example
├── README.md
```

---

## ⏱️ Time Tracking

| Task                     | Estimate     | Actual         |
| ------------------------ | ------------ | -------------- |
| Laravel API & Auth       | 3 hrs        | \~3 hrs        |
| Product & Order Logic    | 3 hrs        | \~3 hrs        |
| React UI + Logic         | 4 hrs        | \~4 hrs        |
| Testing, Cleanup, README | 1.5 hrs      | \~1.5 hrs      |
| **Total**                | **11.5 hrs** | **\~11.5 hrs** |

---

## 📑 Notes

* API is fully stateless and RESTful.
* React app is integrated using Vite inside `resources/js`.
* Follows Laravel & React best practices for structure and logic.
* No usage of Inertia.js or Livewire.
* Admin email on "Order Placed" is simulated via log using Events & Listeners.

---

## 🧪 Test Login

Use this to test login:

```
email: test@example.com
password: password
```

```
