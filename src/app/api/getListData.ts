import { useQuery } from "@tanstack/react-query";
import { fetchListService } from "../services/list.services";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export const listApi = () => {
  return useQuery({
    queryKey: ["list"],
    queryFn: () => {
      return fetchListService()
    },
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });
};
