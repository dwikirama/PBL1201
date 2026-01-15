import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useParams } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import EditPage from "./components/EditPage";
import LogsPage from "./components/LogsPage";
import "./App.css";

// Komponen Helper untuk menangani Edit via URL Token
const EditPageWrapper = ({ cars, onUpdate, onCancel }) => {
  const { token } = useParams(); // Mengambil token dari URL
  const carToEdit = cars.find((c) => c.token === token);

  // Jika token tidak valid atau data tidak ditemukan
  if (!carToEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error 404</h2>
          <p className="text-gray-600 mb-4">Data kendaraan tidak ditemukan atau token tidak valid.</p>
          <button onClick={onCancel} className="bg-blue-600 text-white px-4 py-2 rounded">
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <EditPage car={carToEdit} onUpdate={onUpdate} onCancel={onCancel} />;
};

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [cars, setCars] = useState([]);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  // Load data dari localStorage
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("cars") || "[]");
    const savedLogs = JSON.parse(localStorage.getItem("logs") || "[]");
    const savedUser = localStorage.getItem("loggedInUser");

    setCars(savedCars);
    setLogs(savedLogs);

    if (savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  // Logger System
  const addLog = (action, details) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleString("id-ID"),
      username: loggedInUser || "Guest",
      ip_address: "192.168.1." + Math.floor(Math.random() * 255),
      action,
      details,
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem("logs", JSON.stringify(updatedLogs));
  };

  // Login Handler
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setLoggedInUser(username);
      localStorage.setItem("loggedInUser", username);
      addLog("LOGIN", `User ${username} berhasil masuk sistem`);
      navigate("/dashboard");
      return { success: true };
    } else {
      addLog("LOGIN_FAILED", `Percobaan login gagal: ${username}`);
      return { success: false, error: "Username atau password salah" };
    }
  };

  // Logout Handler
  const handleLogout = () => {
    addLog("LOGOUT", `User ${loggedInUser} keluar dari sistem`);
    setLoggedInUser("");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  // Add Car (Secure #1: Token UUID)
  const handleAddCar = (carData) => {
    const newCar = {
      id: Date.now(),
      token: self.crypto.randomUUID(), // Generates secure UUID (e.g. "d2ee0b41-...")
      ...carData,
    };

    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    addLog("ADD", `Menambahkan ${newCar.merek} ${newCar.model} (Token: ${newCar.token})`);
  };

  // Update Car
  const handleUpdateCar = (updatedCar) => {
    const updatedCars = cars.map((c) => (c.token === updatedCar.token ? updatedCar : c));

    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    addLog("UPDATE", `Memperbarui data token: ${updatedCar.token}`);
    navigate("/dashboard");
  };

  // Delete Car
  const handleDeleteCar = (car) => {
    if (window.confirm("Hapus data ini?")) {
      const updatedCars = cars.filter((c) => c.token !== car.token);
      setCars(updatedCars);
      localStorage.setItem("cars", JSON.stringify(updatedCars));
      addLog("DELETE", `Menghapus data token: ${car.token}`);
    }
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!loggedInUser) {
      // Jika belum login, tampilkan pesan teks
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
          <h1 className="text-3xl font-bold mb-4">An authorized access</h1>
          <p className="text-gray-500 mb-6">Anda tidak memiliki akses ke halaman ini.</p>
          <button onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Silakan Login
          </button>
        </div>
      );
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard
              username={loggedInUser}
              cars={cars}
              onAddCar={handleAddCar}
              onEditCar={(car) => navigate(`/edit/${car.token}`)} // Navigasi menggunakan Token
              onDeleteCar={handleDeleteCar}
              onLogout={handleLogout}
              onViewLogs={() => navigate("/logs")}
            />
          </ProtectedRoute>
        }
      />

      {/* Route Edit Dinamis dengan Token */}
      <Route
        path="/edit/:token"
        element={
          <ProtectedRoute>
            <EditPageWrapper cars={cars} onUpdate={handleUpdateCar} onCancel={() => navigate("/dashboard")} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logs"
        element={
          <ProtectedRoute>
            <LogsPage logs={logs} onBack={() => navigate("/dashboard")} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={loggedInUser ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
