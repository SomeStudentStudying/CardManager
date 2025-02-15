import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dices, ArrowLeft } from 'lucide-react';
import useStore from '../store';

interface BoosterCard {
  card: string;
  rarity: string;
}

const PlayBooster: React.FC = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const { sets, cards } = useStore();
  const [boosterCards, setBoosterCards] = useState<BoosterCard[]>([]);

  const set = sets.find((s) => s.id === setId);
  const setCards = cards.filter((card) => set?.cardIds.includes(card.id));

  const getRandomCard = (rarity: string) => {
    const rarityCards = setCards.filter((card) => card.rarity === rarity);
    if (rarityCards.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * rarityCards.length);
    return rarityCards[randomIndex];
  };

  const getRandomCardAnyRarity = () => {
    if (setCards.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * setCards.length);
    return setCards[randomIndex];
  };

  const generateBooster = () => {
    const booster: BoosterCard[] = [];

    // 7 commons
    for (let i = 0; i < 7; i++) {
      const card = getRandomCard('common');
      if (card) booster.push({ card: card.id, rarity: 'common' });
    }

    // 3 uncommons
    for (let i = 0; i < 3; i++) {
      const card = getRandomCard('uncommon');
      if (card) booster.push({ card: card.id, rarity: 'uncommon' });
    }

    // 1 rare/mythic (87.5% rare, 12.5% mythic)
    const isRare = Math.random() > 0.125;
    const rareCard = getRandomCard(isRare ? 'rare' : 'mythic');
    if (rareCard) booster.push({ card: rareCard.id, rarity: isRare ? 'rare' : 'mythic' });

    // 1 land
    const landCard = setCards.find((card) => card.type.toLowerCase().includes('land'));
    if (landCard) booster.push({ card: landCard.id, rarity: landCard.rarity });

    // 2 wildcards (any rarity)
    for (let i = 0; i < 2; i++) {
      const card = getRandomCardAnyRarity();
      if (card) booster.push({ card: card.id, rarity: card.rarity });
    }

    setBoosterCards(booster);
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
          <h1 className="text-3xl font-bold">Play Booster - {set.name}</h1>
        </div>
        <button
          onClick={generateBooster}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Dices className="w-4 h-4 mr-2" />
          Test Draft
        </button>
      </div>

      {boosterCards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {boosterCards.map((boosterCard, index) => {
            const card = cards.find((c) => c.id === boosterCard.card);
            if (!card) return null;

            return (
              <div
                key={`${card.id}-${index}`}
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
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{card.name}</h3>
                    <span className="text-sm text-gray-600">{card.manaCost}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Rarity: {boosterCard.rarity.charAt(0).toUpperCase() + boosterCard.rarity.slice(1)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {boosterCards.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">No Booster Generated</h2>
          <p className="mt-2 text-gray-600">
            Click the "Test Draft" button to generate a booster pack
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayBooster;