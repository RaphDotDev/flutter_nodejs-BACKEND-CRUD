# 🚀 Setup Guide: Node.js + MongoDB (for Flutter Backend)

This guide helps you set up a local Node.js + MongoDB environment for your Flutter app.

---

## 🧰 Step 1: Initialize the Project

```bash
npm init -y
```

## 🔁 Step 2: Install Dependencies

```bash
npm install nodemon mongoose
```

* `nodemon` 🔄 — Auto-restarts your server on file changes
* `mongoose` 🍃 — MongoDB ODM (Object Document Mapper)

---

## 🧱 Step 3: Install MongoDB

1. Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install:

   * ✅ MongoDB Server
   * ✅ MongoDB Compass (GUI)

---

## 💾 Step 4: Create `index.js`

```js
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://YOUR_IPV4_ADDRESS:PORT/dbname");

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected");
});

app.listen(PORT, () => console.log("🚀 Server running..."));
```

Replace `YOUR_IPV4_ADDRESS` and `PORT` with the correct values.

---

## 🌐 Step 5: Connect Emulator to Localhost

### 📍 Get your IP address

```bash
ipconfig
```

Copy your **IPv4 Address** (e.g. `192.168.1.10`)

### ⚙️ In the Android Emulator:

1. Go to **Settings**
2. Tap `Network & internet`
3. Tap `Mobile network` → `Advanced`
4. Add the IP and Port as proxy:

   * **Host**: your IPv4 Address
   * **Port**: the one set in `index.js`

> This connects your Android emulator to your PC’s localhost.

---

## ✅ Done!

You can now:

* 📱 Make requests from your Flutter app
* 📦 Store & retrieve data using MongoDB + Mongoose
* 👨‍💻 Use Compass to browse collections

---

