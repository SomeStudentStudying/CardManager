import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Card, CardSet, JumpstartTheme, AppData } from './types';

interface AppState {
  cards: Card[];
  sets: CardSet[];
  themes: JumpstartTheme[];
  addCard: (card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateCard: (card: Card) => void;
  deleteCard: (cardId: string) => void;
  addSet: (set: Omit<CardSet, 'id' | 'cardIds'>) => string;
  updateSet: (set: CardSet) => void;
  deleteSet: (setId: string) => void;
  addCardToSet: (setId: string, cardId: string) => void;
  removeCardFromSet: (setId: string, cardId: string) => void;
  addTheme: (theme: Omit<JumpstartTheme, 'id' | 'cardIds'>) => string;
  updateTheme: (theme: JumpstartTheme) => void;
  deleteTheme: (themeId: string) => void;
  addCardToTheme: (themeId: string, cardId: string) => void;
  removeCardFromTheme: (themeId: string, cardId: string) => void;
  getThemesBySetId: (setId: string) => JumpstartTheme[];
  importData: (data: AppData) => void;
  clearData: () => void;
}

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cards: [],
      sets: [
        {
          id: 'none',
          name: 'None',
          abbreviation: 'NONE',
          note: 'Default set for unassigned cards',
          cardIds: [],
        },
      ],
      themes: [],
      addCard: (card) => {
        const id = crypto.randomUUID();
        const timestamp = Date.now();
        set((state) => ({
          cards: [
            ...state.cards,
            {
              ...card,
              id,
              createdAt: timestamp,
              updatedAt: timestamp,
            },
          ],
        }));
        return id;
      },
      updateCard: (card) => {
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === card.id ? { ...card, updatedAt: Date.now() } : c
          ),
        }));
      },
      deleteCard: (cardId) => {
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== cardId),
          sets: state.sets.map((set) => ({
            ...set,
            cardIds: set.cardIds.filter((id) => id !== cardId),
          })),
          themes: state.themes.map((theme) => ({
            ...theme,
            cardIds: theme.cardIds.filter((id) => id !== cardId),
          })),
        }));
      },
      addSet: (newSet) => {
        const id = crypto.randomUUID();
        set((state) => ({
          sets: [...state.sets, { ...newSet, id, cardIds: [] }],
        }));
        return id;
      },
      updateSet: (set) => {
        set((state) => ({
          sets: state.sets.map((s) => (s.id === set.id ? set : s)),
        }));
      },
      deleteSet: (setId) => {
        set((state) => ({
          sets: state.sets.filter((s) => s.id !== setId),
          themes: state.themes.filter((t) => t.setId !== setId),
        }));
      },
      addCardToSet: (setId, cardId) => {
        set((state) => ({
          sets: state.sets.map((s) =>
            s.id === setId
              ? { ...s, cardIds: [...new Set([...s.cardIds, cardId])] }
              : s
          ),
        }));
      },
      removeCardFromSet: (setId, cardId) => {
        set((state) => ({
          sets: state.sets.map((s) =>
            s.id === setId
              ? { ...s, cardIds: s.cardIds.filter((id) => id !== cardId) }
              : s
          ),
        }));
      },
      addTheme: (theme) => {
        const id = crypto.randomUUID();
        set((state) => ({
          themes: [...state.themes, { ...theme, id, cardIds: [] }],
        }));
        return id;
      },
      updateTheme: (theme) => {
        set((state) => ({
          themes: state.themes.map((t) => (t.id === theme.id ? theme : t)),
        }));
      },
      deleteTheme: (themeId) => {
        set((state) => ({
          themes: state.themes.filter((t) => t.id !== themeId),
        }));
      },
      addCardToTheme: (themeId, cardId) => {
        set((state) => {
          const theme = state.themes.find((t) => t.id === themeId);
          if (theme) {
            // Add card to set if not already there
            const set = state.sets.find((s) => s.id === theme.setId);
            if (set && !set.cardIds.includes(cardId)) {
              get().addCardToSet(theme.setId, cardId);
            }
          }
          return {
            themes: state.themes.map((t) =>
              t.id === themeId
                ? { ...t, cardIds: [...new Set([...t.cardIds, cardId])] }
                : t
            ),
          };
        });
      },
      removeCardFromTheme: (themeId, cardId) => {
        set((state) => ({
          themes: state.themes.map((t) =>
            t.id === themeId
              ? { ...t, cardIds: t.cardIds.filter((id) => id !== cardId) }
              : t
          ),
        }));
      },
      getThemesBySetId: (setId) => {
        return get().themes.filter((theme) => theme.setId === setId);
      },
      importData: (data) => {
        set(() => ({
          cards: data.cards,
          themes: data.themes || [],
          sets: [
            {
              id: 'none',
              name: 'None',
              abbreviation: 'NONE',
              note: 'Default set for unassigned cards',
              cardIds: [],
            },
            ...data.sets.filter((s) => s.id !== 'none'),
          ],
        }));
      },
      clearData: () => {
        set(() => ({
          cards: [],
          themes: [],
          sets: [
            {
              id: 'none',
              name: 'None',
              abbreviation: 'NONE',
              note: 'Default set for unassigned cards',
              cardIds: [],
            },
          ],
        }));
      },
    }),
    {
      name: 'mtg-card-creator',
    }
  )
);

export default useStore;