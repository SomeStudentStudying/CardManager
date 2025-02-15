export type CardSuperType = 'none' | 'token' | 'legendary' | 'legendary token';
export type CardRarity = 'common' | 'uncommon' | 'rare' | 'mythic';

export interface Card {
  id: string;
  name: string;
  manaCost: string;
  superType: CardSuperType;
  type: string;
  subType: string;
  rarity: CardRarity;
  rulesText: string;
  flavorText: string;
  artworkUrl: string;
  artist: string;
  power?: string;
  toughness?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CardSet {
  id: string;
  name: string;
  abbreviation: string;
  note: string;
  cardIds: string[];
}

export interface JumpstartTheme {
  id: string;
  name: string;
  element: string;
  note: string;
  cardIds: string[];
  setId: string;
}

export interface AppData {
  cards: Card[];
  sets: CardSet[];
  themes: JumpstartTheme[];
}