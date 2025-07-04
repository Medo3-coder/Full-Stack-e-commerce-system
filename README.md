
---

````markdown
# 🛒 Full Stack E-commerce Test Project

This project is a simplified full-stack e-commerce system built using:

- **Laravel 12** (API backend)
- **React.js** (frontend using Vite)
- **Laravel Sanctum** (authentication)
- **Material UI** (styling)

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

### ⚙️ Backend Setup (Laravel)

#### 1. Install Dependencies

```bash
composer install
````

#### 2. Environment Config

```bash
cp .env.example .env
php artisan key:generate
```

#### 3. Setup Database

Edit `.env` and set your database credentials:

```
DB_DATABASE=your_db
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

Then run the migrations:

```bash
php artisan migrate
```

#### 4. Install Sanctum

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

#### 5. Seed a Test User (optional)

```bash
php artisan tinker
>>> \App\Models\User::create([
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => bcrypt('password')
]);
```

---

### 🎨 Frontend Setup (React + Vite)

#### 1. Install Node Dependencies

```bash
npm install
```

#### 2. Run the Frontend Dev Server

```bash
npm run dev
```

Make sure the Laravel server is also running:

```bash
php artisan serve
```

---

## 🔐 Authentication Flow

* `POST /api/login` with email and password
* Save token to `localStorage`
* Axios auto-injects the `Authorization: Bearer <token>` header
* Protected endpoints require valid Sanctum token

---

## 📘 API Documentation

### 🔑 Auth

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| POST   | `/api/login`  | Login and get token      |
| GET    | `/api/user`   | Fetch authenticated user |
| POST   | `/api/logout` | Logout and revoke token  |

### 📦 Products

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/api/products` | List products with filters |

Query Parameters:

```
?search=apple&min_price=10&max_price=200&category=phones
```

### 🛒 Orders

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/api/orders`      | Place a new order  |
| GET    | `/api/orders/{id}` | View order details |

Example request body for placing an order:

```json
{
  "products": [
    { "id": 1, "quantity": 2 },
    { "id": 5, "quantity": 1 }
  ]
}
```

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
* React app is integrated into Laravel using Vite (in `resources/js`).
* Follows Laravel & React best practices.
* No usage of Inertia.js or Livewire.
* "Order Placed" event logs a simulated admin notification.

---

## 🧪 Test Login Credentials

```
email: test@example.com
password: password
```

```

---

```
