import React, { useState } from "react";
import { Plus, Edit2, Trash2, LogOut, FileText, Search } from "lucide-react";

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
    <div className="min-h-screen bg-[#f9f5ff]">
      {/* Navbar Modern */}
      <nav className="bg-[#14248a] text-white px-6 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-bold text-xl tracking-wide">CarData Manager</span>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-[#d4c2fc]">Login sebagai</p>
              <p className="font-semibold text-sm">{username}</p>
            </div>
            <div className="h-8 w-px bg-[#998fc7]/30"></div>
            <button 
              onClick={onLogout} 
              className="flex items-center gap-2 text-sm font-medium text-[#d4c2fc] hover:text-white transition-colors"
            >
              <LogOut size={18} /> Keluar
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Header Content */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#28262c]">Dashboard Mobil</h1>
            <p className="text-[#998fc7] mt-1">Kelola inventaris kendaraan dengan mudah.</p>
          </div>
          <button 
            onClick={onViewLogs} 
            className="flex items-center gap-2 bg-white text-[#14248a] border border-[#d4c2fc] px-5 py-2.5 rounded-xl font-medium hover:bg-[#f9f5ff] transition-all shadow-sm"
          >
            <FileText size={18} />
            Lihat Log Aktivitas
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Tambah Data (Kiri) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-[#d4c2fc]">
              <h2 className="text-lg font-bold text-[#28262c] mb-6 flex items-center gap-2">
                <div className="p-2 bg-[#f9f5ff] rounded-lg text-[#14248a]">
                  <Plus size={20} />
                </div>
                Tambah Unit Baru
              </h2>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#998fc7] uppercase tracking-wider mb-1">Merek</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#d4c2fc] rounded-lg focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none"
                    placeholder="Contoh: Toyota"
                    value={newCar.merek}
                    onChange={(e) => setNewCar({ ...newCar, merek: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#998fc7] uppercase tracking-wider mb-1">Model</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#d4c2fc] rounded-lg focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none"
                    placeholder="Contoh: Avanza"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#998fc7] uppercase tracking-wider mb-1">Tahun</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-[#d4c2fc] rounded-lg focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none"
                      placeholder="2023"
                      value={newCar.tahun}
                      onChange={(e) => setNewCar({ ...newCar, tahun: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#998fc7] uppercase tracking-wider mb-1">Warna</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-[#d4c2fc] rounded-lg focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none"
                      placeholder="Hitam"
                      value={newCar.warna}
                      onChange={(e) => setNewCar({ ...newCar, warna: e.target.value })}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full mt-4 bg-[#14248a] text-white py-3 rounded-xl font-bold hover:bg-[#28262c] transition-all shadow-md"
                >
                  Simpan Data
                </button>
              </form>
            </div>
          </div>

          {/* Tabel Data (Kanan) */}
          <div className="lg:col-span-2">
            {cars.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-md border border-[#d4c2fc] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#f9f5ff]">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-[#14248a] uppercase tracking-wider">Merek & Model</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-[#14248a] uppercase tracking-wider">Tahun</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-[#14248a] uppercase tracking-wider">Warna</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-[#14248a] uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f9f5ff]">
                      {cars.map((car) => (
                        <tr key={car.token} className="hover:bg-[#f9f5ff]/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-[#28262c]">{car.merek}</div>
                            <div className="text-sm text-[#998fc7]">{car.model}</div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-[#28262c]">{car.tahun}</td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-[#f9f5ff] text-[#14248a] border border-[#d4c2fc] rounded-full">
                              {car.warna}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button 
                                onClick={() => onEditCar(car)} 
                                className="p-2 text-[#998fc7] hover:text-[#14248a] hover:bg-[#f9f5ff] rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button 
                                onClick={() => onDeleteCar(car)} 
                                className="p-2 text-[#998fc7] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#d4c2fc] border-dashed py-16 text-center">
                <div className="bg-[#f9f5ff] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-[#998fc7]" />
                </div>
                <p className="text-[#28262c] font-medium">Belum ada data tersedia.</p>
                <p className="text-sm text-[#998fc7] mt-1">Tambahkan unit baru menggunakan form di samping.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;