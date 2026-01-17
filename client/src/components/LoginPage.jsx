import React, { useState } from "react";
import { AlertCircle, CarFront } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onLogin(username, password);
    if (!result.success) {
      setError(result.error);
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f9f5ff]">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#d4c2fc]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f9f5ff] mb-4">
            <CarFront size={32} className="text-[#14248a]" />
          </div>
          <h1 className="text-3xl font-bold text-[#14248a] mb-2">CarData Portal</h1>
          <p className="text-sm text-[#998fc7]">Silakan masuk untuk mengelola data</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#28262c] mb-2">Username</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-[#d4c2fc] rounded-xl focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none transition-all"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-[#28262c] mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-[#d4c2fc] rounded-xl focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none transition-all"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          onClick={handleSubmit} 
          className="w-full bg-[#14248a] text-white py-3 rounded-xl font-bold hover:bg-[#28262c] transition-colors shadow-lg shadow-[#14248a]/20"
        >
          Masuk ke Dashboard
        </button>

        <p className="text-center text-xs text-[#998fc7] mt-8">
          © 2026 CarData System
        </p>
      </div>
    </div>
  );
};

export default LoginPage;