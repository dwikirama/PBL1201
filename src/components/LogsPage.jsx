import React from "react";

const LogsPage = ({ logs, onBack }) => {
  const getBadgeColor = (action) => {
    if (action.includes("FAILED") || action === "DELETE") {
      return "bg-red-100 text-red-700 border border-red-200";
    }
    if (action === "ADD" || action === "UPDATE") {
      return "bg-blue-100 text-blue-700 border border-blue-200";
    }
    return "bg-green-100 text-green-700 border border-green-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-semibold text-gray-900">CarData Manager</span>
          <button onClick={onBack} className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Kembali ke Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Log Aktivitas Sistem</h2>
          <p className="text-sm text-gray-600">Memantau akses dan perubahan data secara real-time.</p>
        </div>

        {/* Tabel Logs */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase">Waktu</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase">IP Address</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase">Aksi</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase">Deskripsi Detail</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100">
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">{log.timestamp}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.username}</td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">{log.ip_address}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getBadgeColor(log.action)}`}>{log.action}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      Belum ada riwayat aktivitas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        {logs.length > 0 && <div className="mt-4 text-sm text-gray-500 text-center">Total {logs.length} aktivitas tercatat</div>}
      </div>
    </div>
  );
};

export default LogsPage;
