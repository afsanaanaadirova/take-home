import { create } from "zustand";
import { ListItem } from "../../app/api/getListData";
import {CardType } from "./card_type";

export const useCardStore = create<CardType>((set) => ({
    activeCards: [],
    deletedCards: [],

    setActiveCards: (cards: ListItem[]) => set({ activeCards: cards }),

    deleteCard: (id: number) =>
        set((state) => {
            const cardToDelete = state.activeCards.find((card) => card.id === id);
            if (cardToDelete) {
                const deletedCard = { id: cardToDelete.id, title: cardToDelete.title };
                return {
                    activeCards: state.activeCards.filter((card) => card.id !== id),
                    deletedCards: [...state.deletedCards, deletedCard],
                };
            }
            return state;
        }),

    revertCard: (id: number) =>
        set((state) => {
            const cardToRevert = state.deletedCards.find((card) => card.id === id);
            if (cardToRevert) {
                return {
                    activeCards: [...state.activeCards, cardToRevert],
                    deletedCards: state.deletedCards.filter((card) => card.id !== id),
                };
            }
            return state;
        }),
}));
