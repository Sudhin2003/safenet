# 🚨 SafeNet – Emergency Alert & Complaint System

SafeNet is a web-based security system that allows users to send emergency alerts and complaints, while admins can monitor, respond, and manage them in real-time.

---

## 🔧 Features

### 👤 User

* Send emergency alerts 🚨
* Submit complaints
* Track complaint status
* View personal alerts
* Update profile (medical info, contact, etc.)

### 👑 Admin

* Live emergency alert monitoring (with sound 🔊)
* View user profiles instantly
* Manage complaints (resolve/delete)
* Create & manage users

---

## 🛠 Tech Stack

* Frontend: HTML, CSS, Vanilla JS
* Backend: Node.js, Express.js
* Database: MongoDB
* Auth: JWT
* Security: bcrypt hashing

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/safenet.git
cd safenet
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Start MongoDB

Make sure MongoDB is running locally:

```bash
mongod
```

### 4. Run the server

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## 🌐 Running the Frontend

Open these files in your browser:

* `login.html`
* `dashboard.html` (for users)
* `admin.html` (for admin)

---

## 🔐 Default Users (Example)

You may create users via admin panel OR manually insert into DB.

---

## ⚠️ Notes

* Admin access required for admin dashboard
* Emergency alerts trigger sound (browser interaction needed)
* Passwords are securely hashed (new users)

---

## 🚀 Future Improvements

* Mobile responsiveness
* Push notifications
* Deployment (Render / Vercel)
* Role-based UI enhancements

---

## 👨‍💻 Author

Built by sudhin

---

## ⭐ If you like this project, consider giving it a star!
