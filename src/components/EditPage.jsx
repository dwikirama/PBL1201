import React, { useState } from "react";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Perbarui Data Unit</h2>

        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Merek</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={editedCar.merek}
                onChange={(e) => setEditedCar({ ...editedCar, merek: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={editedCar.model}
                onChange={(e) => setEditedCar({ ...editedCar, model: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Pembuatan</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={editedCar.tahun}
                onChange={(e) => setEditedCar({ ...editedCar, tahun: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Warna</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={editedCar.warna}
                onChange={(e) => setEditedCar({ ...editedCar, warna: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button onClick={handleSubmit} className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
