import React, { useState } from "react";
import { Plus, Edit2, Trash2, LogOut, FileText } from "lucide-react";

const Dashboard = ({ username, cars, onAddCar, onEditCar, onDeleteCar, onLogout, onViewLogs }) => {
  const [newCar, setNewCar] = useState({
    merek: "",
    model: "",
    tahun: "",
    warna: "",
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!newCar.merek || !newCar.model || !newCar.tahun || !newCar.warna) {
      alert("Semua field harus diisi!");
      return;
    }

    onAddCar(newCar);
    setNewCar({ merek: "", model: "", tahun: "", warna: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="font-semibold text-gray-900">CarData Manager</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Halo, <strong>{username}</strong>
            </span>
            <button onClick={onViewLogs} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors">
              <FileText size={16} />
              Audit Logs
            </button>
            <button onClick={onLogout} className="px-3 py-1.5 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 flex items-center gap-1 transition-colors">
              <LogOut size={14} />
              Keluar
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Form Tambah Unit */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tambah Unit Baru</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <input
              type="text"
              className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Merek (ex: Toyota)"
              value={newCar.merek}
              onChange={(e) => setNewCar({ ...newCar, merek: e.target.value })}
            />
            <input
              type="text"
              className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Model (ex: Avanza)"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            />
            <input
              type="number"
              className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Tahun"
              value={newCar.tahun}
              onChange={(e) => setNewCar({ ...newCar, tahun: e.target.value })}
            />
            <input
              type="text"
              className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Warna"
              value={newCar.warna}
              onChange={(e) => setNewCar({ ...newCar, warna: e.target.value })}
            />
            <button onClick={handleAddSubmit} className="col-span-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-1 transition-colors shadow-sm">
              <Plus size={16} />
              Simpan
            </button>
          </div>
        </div>

        {/* Header Tabel */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Inventaris</h3>
          <span className="text-sm text-gray-500">Total: {cars.length} unit</span>
        </div>

        {/* Tabel Data */}
        {cars.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase w-12">#</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase">Merek</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase">Model</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase">Tahun</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase">Warna</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car, index) => (
                    <tr key={car.token || car.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{car.merek}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{car.model}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{car.tahun}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 rounded">{car.warna}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => onEditCar(car)} className="text-blue-600 hover:text-blue-800 font-medium text-sm mr-4 inline-flex items-center gap-1">
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button onClick={() => onDeleteCar(car)} className="text-red-600 hover:text-red-800 font-medium text-sm inline-flex items-center gap-1">
                          <Trash2 size={14} />
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 py-12 text-center shadow-sm">
            <p className="text-gray-500">Belum ada data tersedia.</p>
            <p className="text-sm text-gray-400 mt-2">Tambahkan unit baru menggunakan form di atas.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
