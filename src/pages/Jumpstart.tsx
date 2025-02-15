import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import useStore from '../store';

const Jumpstart: React.FC = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const { sets, getThemesBySetId, deleteTheme } = useStore();
  const set = sets.find((s) => s.id === setId);
  const themes = getThemesBySetId(setId || '');

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(`/sets/${setId}`)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Set
          </button>
          <h1 className="text-3xl font-bold">Jumpstart - {set.name}</h1>
        </div>
        <button
          onClick={() => navigate(`/sets/${setId}/jumpstart/new`)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Theme
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Theme Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Element
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cards
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {themes.map((theme) => (
              <tr key={theme.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {theme.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {theme.element}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {theme.cardIds.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => navigate(`/sets/${setId}/jumpstart/${theme.id}`)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit2 className="w-4 h-4 inline-block" />
                  </button>
                  <button
                    onClick={() => deleteTheme(theme.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jumpstart;