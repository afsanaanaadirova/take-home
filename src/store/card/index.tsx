import { create } from "zustand";
import { ListItem } from "../../api/getListData"; 
import { CardType } from "./card_type";


export const useCardStore = create<CardType>((set) => ({
  activeCards: [], 
  deletedCards: [], 

  setActiveCards: (cards: ListItem[]) => set({ activeCards: cards }),

  deleteCard: (id: number) =>
    set((state:any) => {
      const cardToDelete = state.activeCards.find((card:any) => card.id === id);
      if (cardToDelete) {
        const deletedCard = { id: cardToDelete.id, title: cardToDelete.title };
        return {
          activeCards: state.activeCards.filter((card:any) => card.id !== id),
          deletedCards: [...state.deletedCards, deletedCard],
        };
      }
      return state;
    }),

  revertCard: (id: number) =>
    set((state:any) => {
      const cardToRevert = state.deletedCards.find((card:any) => card.id === id);
      if (cardToRevert) {
        return {
          activeCards: [...state.activeCards, { id: cardToRevert.id, title: cardToRevert.title }],
          deletedCards: state.deletedCards.filter((card:any) => card.id !== id),
        };
      }
      return state;
    }),
}));
