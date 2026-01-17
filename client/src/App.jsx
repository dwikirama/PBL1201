import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useParams, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import EditPage from "./components/EditPage";
import LogsPage from "./components/LogsPage";
import "./App.css";

const API_URL = "http://localhost:5000"; 

const teamMembers = ['Yurida Zani', 'Aulia Zamaira', 'Muhammad Dwiki Ramadani', 'Dimas Hammam Abdillah', 'Ali Sofyan'];

const Landing = () => (
  <div className="relative w-full min-h-screen font-lato text-white-smoke overflow-hidden">
    <img 
      src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070" 
      alt="Mountain background"
      className="absolute top-0 left-0 object-cover w-full h-full"
    />
    
    <div className="absolute top-0 left-0 w-full h-full bg-black-custom opacity-60"></div>
    
    <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-8 text-center">
      
      <h1 className="text-6xl font-bold md:text-8xl font-playfair tracking-tight">
        Tadika Mesra
      </h1>
      
      <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-widest uppercase text-beaver">
        TUGAS PBL1201
      </h2>

      <p className="max-w-2xl mt-6 text-lg md:text-xl text-white-smoke/90 font-light leading-relaxed">
        Aplikasi Manajemen Data Mobil yang dibangun menggunakan React, Express, dan SQLite.
      </p>
      
      <div className="mt-12">
        <Link 
          to="/pbl1201" 
          className="px-10 py-4 text-lg font-bold text-center text-white transition-all duration-300 transform bg-chocolate-cosmos rounded-full hover:scale-105 hover:bg-[#5a1a25] shadow-2xl border-2 border-white/10 hover:border-beaver"
        >
          MASUK KE APLIKASI
        </Link>
      </div>

      {/* FOOTER ANGGOTA */}
      <div className="mt-20">
        <h3 className="tracking-[0.2em] uppercase text-beaver text-sm font-bold mb-4">DIBANGUN OLEH</h3>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {teamMembers.map((member, index) => (
            <span key={index} className="text-sm md:text-base font-medium text-white-smoke/80 hover:text-white transition-colors cursor-default">
              {member}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Wrapper Edit Page (Tetap sama)
const EditPageWrapper = ({ cars, onUpdate, onCancel }) => {
  const { token } = useParams();
  const carToEdit = cars.find((c) => c.token === token);

  if (!carToEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f5ff]">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-[#d4c2fc]">
          <h2 className="text-xl font-bold text-[#14248a] mb-2">Data Tidak Ditemukan</h2>
          <p className="text-sm text-[#998fc7] mb-6">Token mobil tidak valid atau sudah dihapus.</p>
          <button onClick={onCancel} className="bg-[#14248a] text-white px-6 py-2 rounded-lg hover:bg-[#28262c] transition-colors">
            Kembali Dashboard
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

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setLoggedInUser(savedUser);
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_URL}/cars`);
      const data = await res.json();
      setCars(data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_URL}/logs`);
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error("Gagal ambil logs:", error);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchCars();
    }
  }, [loggedInUser]);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setLoggedInUser(username);
      localStorage.setItem("user", username);
      
      fetch(`${API_URL}/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "LOGIN",
          details: `User ${username} berhasil masuk`,
          username: username
        })
      });

      navigate("/pbl1201/dashboard");
      return { success: true };
    }
    return { success: false, error: "Username atau password salah!" };
  };

  const handleLogout = () => {
    setLoggedInUser("");
    localStorage.removeItem("user");
    navigate("/pbl1201/login");
  };

  const handleAddCar = async (newCar) => {
    try {
        const res = await fetch(`${API_URL}/cars?username=${loggedInUser}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar),
        });
        if (res.ok) fetchCars();
    } catch (error) {
        console.error("Error add car:", error);
    }
  };

  const handleUpdateCar = async (updatedCar) => {
    try {
        const res = await fetch(`${API_URL}/cars/${updatedCar.token}?username=${loggedInUser}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCar),
        });
        if (res.ok) {
            fetchCars();
            navigate("/pbl1201/dashboard");
        }
    } catch (error) {
        console.error("Error update car:", error);
    }
  };

  const handleDeleteCar = async (car) => {
    if (window.confirm(`Yakin ingin menghapus ${car.merek}?`)) {
        try {
            const res = await fetch(`${API_URL}/cars/${car.token}?username=${loggedInUser}`, {
                method: "DELETE",
            });
            if (res.ok) fetchCars();
        } catch (error) {
            console.error("Error delete car:", error);
        }
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (!loggedInUser) {
      return <Navigate to="/pbl1201/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Route Root: Landing Page Mewah */}
      <Route path="/" element={<Landing />} />

      {/* Redirect /pbl1201 ke dashboard/login */}
      <Route path="/pbl1201" element={<Navigate to={loggedInUser ? "/pbl1201/dashboard" : "/pbl1201/login"} replace />} />

      {/* App Routes */}
      <Route path="/pbl1201/login" element={<LoginPage onLogin={handleLogin} />} />

      <Route
        path="/pbl1201/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard
              username={loggedInUser}
              cars={cars}
              onAddCar={handleAddCar}
              onEditCar={(car) => navigate(`/pbl1201/edit/${car.token}`)}
              onDeleteCar={handleDeleteCar}
              onLogout={handleLogout}
              onViewLogs={() => {
                fetchLogs();
                navigate("/pbl1201/logs");
              }}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pbl1201/edit/:token"
        element={
          <ProtectedRoute>
            <EditPageWrapper cars={cars} onUpdate={handleUpdateCar} onCancel={() => navigate("/pbl1201/dashboard")} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pbl1201/logs"
        element={
          <ProtectedRoute>
            <LogsPage logs={logs} onBack={() => navigate("/pbl1201/dashboard")} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;