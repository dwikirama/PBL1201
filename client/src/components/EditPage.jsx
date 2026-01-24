import React, { useState } from "react";
import { Save, X } from "lucide-react";

const EditPage = ({ car, onUpdate, onCancel }) => {
  const [editedCar, setEditedCar] = useState({
    ...car,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedCar.merek || !editedCar.model || !editedCar.tahun || !editedCar.warna) {
      alert("Semua field harus diisi!");
      return;
    }
    onUpdate(editedCar);
  };

  return (
    <div className="min-h-screen bg-[#f9f5ff] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-[#d4c2fc]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#14248a]">Edit Data Unit</h2>
            <p className="text-xs text-[#998fc7] mt-1">
              ID Token: <span className="font-mono">{car.token}</span>
            </p>
          </div>
          <button onClick={onCancel} className="text-[#998fc7] hover:text-[#28262c] transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-semibold text-[#998fc7] uppercase tracking-wider mb-2">Merek</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-[#d4c2fc] rounded-xl focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none"
                value={editedCar.merek}
                onChange={(e) => setEditedCar({ ...editedCar, merek: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#998fc7] uppercase tracking-wider mb-2">Model</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-[#d4c2fc] rounded-xl focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none"
                value={editedCar.model}
                onChange={(e) => setEditedCar({ ...editedCar, model: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#998fc7] uppercase tracking-wider mb-2">Tahun</label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-[#d4c2fc] rounded-xl focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none"
                value={editedCar.tahun}
                onChange={(e) => setEditedCar({ ...editedCar, tahun: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#998fc7] uppercase tracking-wider mb-2">Warna</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-[#d4c2fc] rounded-xl focus:ring-2 focus:ring-[#998fc7] focus:border-[#14248a] outline-none"
                value={editedCar.warna}
                onChange={(e) => setEditedCar({ ...editedCar, warna: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-[#f9f5ff]">
            <button type="button" onClick={onCancel} className="flex-1 px-4 py-3 border border-[#d4c2fc] rounded-xl font-bold text-[#998fc7] hover:bg-[#f9f5ff] hover:text-[#14248a] transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#14248a] text-white rounded-xl font-bold hover:bg-[#28262c] transition-all shadow-lg shadow-[#14248a]/20">
              <Save size={18} /> Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
