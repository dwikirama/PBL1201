import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useParams } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import EditPage from "./components/EditPage";
import LogsPage from "./components/LogsPage";
import "./App.css";

const API_URL = "http://localhost:5000"; // URL Backend Express

// Wrapper Edit Page (Sama seperti sebelumnya)
const EditPageWrapper = ({ cars, onUpdate, onCancel }) => {
  const { token } = useParams();
  const carToEdit = cars.find((c) => c.token === token);

  if (!carToEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold text-red-600">Data Tidak Ditemukan</h2>
          <button onClick={onCancel} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Kembali
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

  // 1. LOAD DATA DARI BACKEND (Ganti useEffect localStorage)
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
      fetchCars(); // Ambil data mobil dari server
    }
  }, []);

  // Fungsi ambil data Mobil
  const fetchCars = async () => {
    try {
      const response = await fetch(`${API_URL}/cars`);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Gagal ambil data mobil:", error);
    }
  };

  // Fungsi ambil Logs
  const fetchLogs = async () => {
    try {
      const response = await fetch(`${API_URL}/logs`);
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Gagal ambil logs:", error);
    }
  };

  // 2. HANDLE LOGIN (Ke API)
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.success) {
        setLoggedInUser(data.username);
        localStorage.setItem("loggedInUser", data.username); // Simpan sesi di browser aja cukup
        fetchCars(); // Load data setelah login
        navigate("/dashboard");
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: "Server Error" };
    }
  };

  // 3. HANDLE LOGOUT
  const handleLogout = () => {
    setLoggedInUser("");
    localStorage.removeItem("loggedInUser");
    setCars([]); // Kosongkan data di frontend
    navigate("/login");
  };

  // 4. ADD CAR (Ke API)
  const handleAddCar = async (carData) => {
    try {
      await fetch(`${API_URL}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...carData, username: loggedInUser }), // Kirim username untuk log
      });
      fetchCars(); // Refresh data tabel
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  // 5. UPDATE CAR (Ke API)
  const handleUpdateCar = async (updatedCar) => {
    try {
      await fetch(`${API_URL}/cars/${updatedCar.token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedCar, username: loggedInUser }),
      });
      fetchCars();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  // 6. DELETE CAR (Ke API)
  const handleDeleteCar = async (car) => {
    if (window.confirm("Hapus data ini?")) {
      try {
        await fetch(`${API_URL}/cars/${car.token}?username=${loggedInUser}`, {
          method: "DELETE",
        });
        fetchCars();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  // Protected Route (Tetap sama)
  const ProtectedRoute = ({ children }) => {
    if (!loggedInUser) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
          <h1 className="text-3xl font-bold mb-4">An authorized access</h1>
          <p className="text-gray-500 mb-6">Anda tidak memiliki akses ke halaman ini.</p>
          <button onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
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
              onEditCar={(car) => navigate(`/edit/${car.token}`)}
              onDeleteCar={handleDeleteCar}
              onLogout={handleLogout}
              onViewLogs={() => {
                fetchLogs(); // Ambil log terbaru saat tombol diklik
                navigate("/logs");
              }}
            />
          </ProtectedRoute>
        }
      />

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
