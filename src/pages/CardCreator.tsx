import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, SaveAll, RefreshCw } from 'lucide-react';
import useStore from '../store';

const SUPER_TYPES = ['none', 'token', 'legendary', 'legendary token'] as const;
const RARITIES = ['common', 'uncommon', 'rare', 'mythic'] as const;

const DEFAULT_CARD = {
  name: '',
  manaCost: '',
  superType: 'none',
  type: '',
  subType: '',
  rarity: 'common',
  rulesText: '',
  flavorText: '',
  artworkUrl: '',
  artist: '',
  power: '',
  toughness: '',
};

const CardCreator: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(DEFAULT_CARD);
  const [selectedSet, setSelectedSet] = useState('none');
  const { addCard, addCardToSet, sets } = useStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (action: 'continue' | 'library' | 'clear') => {
    const cardId = addCard(formData);
    addCardToSet(selectedSet, cardId);

    if (action === 'library') {
      navigate('/library');
    } else if (action === 'clear') {
      setFormData(DEFAULT_CARD);
      setSelectedSet('none');
    }
  };

  const cardPreview = useMemo(() => {
    const fullType = [
      formData.superType !== 'none' ? formData.superType : '',
      formData.type,
      formData.subType ? `— ${formData.subType}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="w-64 h-96 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{formData.name || 'Card Name'}</h3>
          <span className="text-sm">{formData.manaCost || '{2}'}</span>
        </div>
        {formData.artworkUrl && (
          <img
            src={formData.artworkUrl}
            alt={formData.name}
            className="w-full h-40 object-cover rounded-lg mb-2"
          />
        )}
        <div className="text-sm mb-2">{fullType || 'Type'}</div>
        <div className="text-sm mb-2 flex-grow">
          {formData.rulesText || 'Rules text will appear here'}
        </div>
        <div className="text-sm italic mb-2">{formData.flavorText}</div>
        <div className="flex justify-between items-end text-sm">
          <span>{formData.artist ? `Illus. ${formData.artist}` : ''}</span>
          {(formData.power || formData.toughness) && (
            <span>
              {formData.power || 0}/{formData.toughness || 0}
            </span>
          )}
        </div>
      </div>
    );
  }, [formData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Create New Card</h1>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mana Cost</label>
              <input
                type="text"
                name="manaCost"
                value={formData.manaCost}
                onChange={handleInputChange}
                placeholder="{2}{B}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Super Type</label>
              <select
                name="superType"
                value={formData.superType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {SUPER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="Creature"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sub Type</label>
              <input
                type="text"
                name="subType"
                value={formData.subType}
                onChange={handleInputChange}
                placeholder="Human Wizard"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rules Text</label>
            <textarea
              name="rulesText"
              value={formData.rulesText}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Flavor Text</label>
            <textarea
              name="flavorText"
              value={formData.flavorText}
              onChange={handleInputChange}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Artwork URL</label>
              <input
                type="url"
                name="artworkUrl"
                value={formData.artworkUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Artist</label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Power</label>
              <input
                type="text"
                name="power"
                value={formData.power}
                onChange={handleInputChange}
                placeholder="2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Toughness</label>
              <input
                type="text"
                name="toughness"
                value={formData.toughness}
                onChange={handleInputChange}
                placeholder="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rarity</label>
              <select
                name="rarity"
                value={formData.rarity}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {RARITIES.map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Set</label>
            <select
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {sets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.name} ({set.abbreviation})
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleSave('library')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save & Go to Library
            </button>
            <button
              onClick={() => handleSave('continue')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <SaveAll className="w-4 h-4 mr-2" />
              Save & Continue
            </button>
            <button
              onClick={() => handleSave('clear')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Save & Clear
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Card Preview</h2>
        {cardPreview}
      </div>
    </div>
  );
};

export default CardCreator;