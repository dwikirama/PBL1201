import React from "react";
import { ArrowLeft, Clock, ShieldCheck, Activity } from "lucide-react";

const LogsPage = ({ logs, onBack }) => {
  
  // Custom Badge Colors untuk Palet Baru
  const getBadgeStyle = (action) => {
    if (action.includes("FAILED") || action === "DELETE") {
      return "bg-red-50 text-red-600 border border-red-200";
    }
    if (action === "ADD" || action === "UPDATE") {
      return "bg-[#f9f5ff] text-[#14248a] border border-[#d4c2fc]";
    }
    // Login / Default
    return "bg-green-50 text-green-700 border border-green-200";
  };

  return (
    <div className="min-h-screen bg-[#f9f5ff]">
      {/* Navbar Modern */}
      <nav className="bg-[#14248a] text-white px-6 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck size={24} className="text-[#d4c2fc]" />
            <span className="font-bold text-xl tracking-wide">Audit Logs</span>
          </div>
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-sm bg-white/10 border border-white/20 px-4 py-2 rounded-lg hover:bg-white hover:text-[#14248a] transition-all"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-[#d4c2fc] overflow-hidden">
          <div className="p-6 border-b border-[#f9f5ff] flex items-center gap-3">
            <div className="p-2 bg-[#f9f5ff] rounded-lg text-[#14248a]">
              <Activity size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#28262c]">Riwayat Aktivitas</h2>
              <p className="text-xs text-[#998fc7]">Mencatat semua perubahan data dan akses sistem</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9f5ff]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#998fc7] uppercase tracking-wider">Waktu</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#998fc7] uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#998fc7] uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#998fc7] uppercase tracking-wider">Aksi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#998fc7] uppercase tracking-wider">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f9f5ff]">
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#f9f5ff]/30 transition-colors">
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2 text-[#28262c]">
                          <Clock size={14} className="text-[#998fc7]" />
                          {log.timestamp}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-[#14248a]">{log.username}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-[#998fc7]">{log.ip_address}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${getBadgeStyle(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#28262c] font-medium">{log.details}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center text-[#998fc7]">
                      Belum ada riwayat aktivitas yang tercatat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-[#998fc7]">
          Menampilkan data log terbaru dari database.
        </div>
      </div>
    </div>
  );
};

export default LogsPage;