import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Grid, List, Plus, Edit2, X, Dices, Zap } from 'lucide-react';
import useStore from '../store';

type ViewMode = 'grid' | 'list';

const SetEditor: React.FC = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const { sets, cards, updateSet, removeCardFromSet, addCardToSet } = useStore();
  const set = sets.find((s) => s.id === setId);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState(
    set || {
      id: '',
      name: '',
      abbreviation: '',
      note: '',
      cardIds: [],
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (set) {
      updateSet(formData);
    }
  };

  const setCards = cards.filter((card) => set?.cardIds.includes(card.id));
  const availableCards = cards.filter(
    (card) =>
      !set?.cardIds.includes(card.id) &&
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h1 className="text-3xl font-bold">Edit Set</h1>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Set Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={set.id === 'none'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Abbreviation
            </label>
            <input
              type="text"
              name="abbreviation"
              value={formData.abbreviation}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              maxLength={5}
              disabled={set.id === 'none'}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={set.id === 'none'}
          />
        </div>

        {set.id !== 'none' && (
          <div className="flex justify-between">
            <div className="space-x-4">
              <button
                onClick={() => navigate(`/sets/${setId}/booster`)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                <Dices className="w-4 h-4 mr-2" />
                Play Booster
              </button>
              <button
                onClick={() => navigate(`/sets/${setId}/jumpstart`)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Jumpstart
              </button>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Cards in Set</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {setCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {card.artworkUrl && (
                  <img
                    src={card.artworkUrl}
                    alt={card.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{card.name}</h3>
                    <span className="text-sm text-gray-600">{card.manaCost}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => navigate(`/edit/${card.id}`)}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => removeCardFromSet(set.id, card.id)}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mana Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P/T
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {setCards.map((card) => {
                  const fullType = [
                    card.superType !== 'none' ? card.superType : '',
                    card.type,
                    card.subType ? `— ${card.subType}` : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <tr key={card.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {card.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {card.manaCost}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fullType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {card.power || card.toughness
                          ? `${card.power || 0}/${card.toughness || 0}`
                          : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => navigate(`/edit/${card.id}`)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit2 className="w-4 h-4 inline-block" />
                        </button>
                        <button
                          onClick={() => removeCardFromSet(set.id, card.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-4 h-4 inline-block" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold">Add Cards</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {availableCards.map((card) => (
                <tr key={card.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {card.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => addCardToSet(set.id, card.id)}
                      className="inline-flex items-center text-green-600 hover:text-green-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SetEditor;