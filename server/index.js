const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const sqlite3 = require("sqlite3").verbose(); // Import SQLite
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE SETUP (SQLite) ---
// Membuat file database bernama 'car-data.db'
const db = new sqlite3.Database("./car-data.db", (err) => {
  if (err) console.error("Error opening database:", err.message);
  else console.log("Terhubung ke database SQLite.");
});

// Membuat Tabel jika belum ada
db.serialize(() => {
  // Tabel Mobil
  db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE,
    merek TEXT,
    model TEXT,
    tahun TEXT,
    warna TEXT
  )`);

  // Tabel Logs (Secure #3)
  db.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    username TEXT,
    ip_address TEXT,
    action TEXT,
    details TEXT
  )`);
});

// --- HELPER FUNCTION: GET CLEAN IP ---
const getClientIp = (req) => {
  const ip = req.ip;
  if (ip === "::1" || ip === "::ffff:127.0.0.1") return "127.0.0.1";
  return ip;
};

// --- HELPER FUNCTION: ADD LOG TO DB ---
const addLog = (action, details, username, ip) => {
  const timestamp = new Date().toLocaleString("id-ID");
  const query = `INSERT INTO logs (timestamp, username, ip_address, action, details) VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [timestamp, username, ip, action, details], (err) => {
    if (err) console.error("Gagal menyimpan log:", err.message);
  });
};

// --- ROUTES / API ENDPOINTS ---

// 1. LOGIN (Secure #2)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ip = getClientIp(req);

  if (username === "admin" && password === "admin123") {
    addLog("LOGIN", `User ${username} berhasil masuk`, username, ip);
    res.json({ success: true, username: username });
  } else {
    addLog("LOGIN_FAILED", `Gagal login username: ${username}`, "Guest", ip);
    res.status(401).json({ success: false, message: "Username/Password salah" });
  }
});

// 2. GET ALL CARS (READ)
app.get("/cars", (req, res) => {
  db.all("SELECT * FROM cars ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 3. ADD CAR (CREATE - Secure #1 Token)
app.post("/cars", (req, res) => {
  const { merek, model, tahun, warna, username } = req.body;
  const ip = getClientIp(req);
  const token = crypto.randomUUID(); // Token UUID

  const query = `INSERT INTO cars (token, merek, model, tahun, warna) VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [token, merek, model, tahun, warna], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Kirim balik data yang baru disimpan
    const newCar = { id: this.lastID, token, merek, model, tahun, warna };
    addLog("ADD", `Menambah ${merek} ${model} (Token: ${token})`, username || "Guest", ip);
    res.json({ success: true, car: newCar });
  });
});

// 4. UPDATE CAR (UPDATE BY TOKEN)
app.put("/cars/:token", (req, res) => {
  const { token } = req.params;
  const { merek, model, tahun, warna, username } = req.body;
  const ip = getClientIp(req);

  // Debug log untuk memastikan username diterima
  console.log("UPDATE Request:", { token, merek, model, tahun, warna, username, ip });

  const query = `UPDATE cars SET merek = ?, model = ?, tahun = ?, warna = ? WHERE token = ?`;

  db.run(query, [merek, model, tahun, warna, token], function (err) {
    if (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: "Mobil tidak ditemukan" });
    }

    // Perbaiki: Pastikan username dicatat di log
    const loggedUsername = username || "Guest";
    addLog("UPDATE", `Update data ${merek} ${model} (Token: ${token})`, loggedUsername, ip);

    console.log("Update success, log created for user:", loggedUsername);
    res.json({ success: true });
  });
});

// 5. DELETE CAR (DELETE BY TOKEN)
app.delete("/cars/:token", (req, res) => {
  const { token } = req.params;
  const { username } = req.query;
  const ip = getClientIp(req);

  // Ambil data dulu untuk log sebelum dihapus
  db.get("SELECT * FROM cars WHERE token = ?", [token], (err, row) => {
    if (!row) {
      return res.status(404).json({ success: false, message: "Mobil tidak ditemukan" });
    }

    // Hapus data
    db.run("DELETE FROM cars WHERE token = ?", [token], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      addLog("DELETE", `Hapus data ${row.merek} ${row.model} (Token: ${token})`, username || "Guest", ip);
      res.json({ success: true });
    });
  });
});

// 6. GET LOGS (READ LOGS)
app.get("/logs", (req, res) => {
  db.all("SELECT * FROM logs ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server SQLite berjalan di http://localhost:${PORT}`);
});
