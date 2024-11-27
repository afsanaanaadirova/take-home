import { useEffect, useState } from "react";
import { listApi } from "../app/api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { useCardStore } from "../store/card";

export const Entrypoint = () => {
  const [revealDeleted, setRevealDeleted] = useState(false);
  const { deletedCards, deleteCard, revertCard, setActiveCards,activeCards } = useCardStore();
  const listQuery = listApi();
  useEffect(() => {
    if (listQuery.data && listQuery.data.length > 0) {
      setActiveCards(listQuery.data);
    }
  }, [listQuery.data, setActiveCards]);

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setActiveCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading, deletedCards, revertCard]);

  if (listQuery.isLoading || listQuery.isFetching) {
    return <Spinner />;
  }

  const refreshData = () => {
    listQuery.refetch();
  };

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({activeCards.length})</h1>
        <div className="flex flex-col gap-y-3">
          {activeCards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              onDelete={() => (deleteCard(card.id), card.isVisible = false)} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h6 className="mb-1 font-medium text-lg"> Deleted Cards ({deletedCards.length})</h6>
          <div className="flex gap-x-2">
            <button
              onClick={() => setRevealDeleted((prev) => !prev)}
              className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            >
              Reveal
            </button>
            <button
              onClick={refreshData}
              className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
        </div>
        <div className="flex flex-col gap-y-3">
          {revealDeleted &&
            deletedCards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                isDeleted={true}
                description={card.description}
                onRevert={() => revertCard(card.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};