import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useStore from '../store';

const JumpstartThemeCreator: React.FC = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const { sets, addTheme } = useStore();
  const set = sets.find((s) => s.id === setId);

  const [formData, setFormData] = useState({
    name: '',
    element: '',
    note: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setId) {
      const themeId = addTheme({ ...formData, setId });
      navigate(`/sets/${setId}/jumpstart/${themeId}`);
    }
  };

  if (!set) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900">Set not found</h1>
        <p className="mt-2 text-gray-600">
          The set you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/sets')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Set Manager
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate(`/sets/${setId}/jumpstart`)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jumpstart
        </button>
        <h1 className="text-3xl font-bold">Create New Theme</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Theme Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Element</label>
          <input
            type="text"
            name="element"
            required
            value={formData.element}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            The primary element or theme (e.g., "Fire", "Angels", "Goblins")
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Theme
          </button>
        </div>
      </form>
    </div>
  );
};

export default JumpstartThemeCreator;