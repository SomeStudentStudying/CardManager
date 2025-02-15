import React, { useRef } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import useStore from '../store';

const Config: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { cards, sets, themes, importData, clearData } = useStore();

  const handleExport = () => {
    const data = {
      cards,
      sets,
      themes,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mtg-card-creator-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          importData(data);
        } catch (error) {
          console.error('Error importing data:', error);
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearData = () => {
    if (
      window.confirm(
        'Are you sure you want to clear all data? This action cannot be undone.'
      )
    ) {
      clearData();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Configuration</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Data Management</h2>
          <p className="text-gray-600 mb-4">
            Export your card library, sets, and Jumpstart themes, or import data from a backup file.
          </p>
          <div className="space-y-4">
            <button
              onClick={handleExport}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Danger Zone</h2>
          <p className="text-gray-600 mb-4">
            Clear all data from the application. This action cannot be undone.
          </p>
          <button
            onClick={handleClearData}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Data
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Statistics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Cards</p>
            <p className="text-2xl font-bold">{cards.length}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Sets</p>
            <p className="text-2xl font-bold">{sets.length}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Themes</p>
            <p className="text-2xl font-bold">{themes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Config;