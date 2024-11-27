import { ListItem } from "../api/getListData";
import mockJson from "../api/mock.json";

export const fetchListService = async (): Promise<ListItem[]> => {
  const mockData = mockJson as Omit<ListItem, "isVisible">[];
  
  if (getRandom() > 85) {
    throw new Error("👀 An unexpected error occurred!");
  }

  return shuffle(mockData).map(item => ({
    ...item,
    isVisible: getRandom() > 50
  }));
};

const getRandom = (): number => Math.floor(Math.random() * 100);

const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
};
