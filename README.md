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

## 🧪 Quick Setup (Linux / Ubuntu)

### 1. Install Node.js

sudo apt update
sudo apt install nodejs npm -y

Check install:
node -v
npm -v

---

### 2. Install MongoDB

sudo apt install -y mongodb

Start MongoDB:
sudo systemctl start mongodb

Enable it on startup:
sudo systemctl enable mongodb

Check status:
sudo systemctl status mongodb

---

### 3. Clone the project

git clone https://github.com/Sudhin2003/safenet.git
cd safenet

---

### 4. Install dependencies

npm install

---

### 5. Create .env file

touch .env

Open it:
nano .env

Add this line:

MONGO_URI=mongodb://127.0.0.1:27017/security-system

Save and exit:
CTRL + X → Y → Enter

---

### 6. Start the server

node server/server.js

You should see:
Server running on port 5000
DB Connected

---

### 7. Open the app

Go to:

client/login.html

---

## ✅ Done!

### 🔹 Step 2 — Open Frontend (VERY EASY)

Go to your project folder:

safenet → client

Now open:

👉 login.html

How to open:
- Right-click → Open With → Browser  
OR  
- Double-click the file  

---

### 🔹 Direct Paths

You can open these:

- client/login.html → Login page  
- client/dashboard.html → User dashboard  
- client/admin.html → Admin panel  

---

### ⚠️ If nothing loads

Try this:

Right-click inside `client` folder →  
Open Terminal →

Run:

python3 -m http.server 5500

Then open in browser:

http://localhost:5500/login.html

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
