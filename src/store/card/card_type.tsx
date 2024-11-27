import { ListItem } from "../../app/api/getListData";

export type Card = {
    id: number;
    title: string;
    description?: string;
    isVisible?: boolean;
};
// export type DeletedListItem = Omit<Card, "description" | "isVisible">;

export type CardType = {
    activeCards: Card[];
    deletedCards: Card[];
    deleteCard: (id: number) => void;
    revertCard: (id: number) => void;
    setActiveCards: (cards: ListItem[]) => void
};

