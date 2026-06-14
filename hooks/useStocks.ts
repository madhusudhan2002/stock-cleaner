import { useQuery } from "@tanstack/react-query";

export function useStocks() {
  return useQuery({
    queryKey: ["stocks"],

    queryFn: async () => {
      const response =
        await fetch("/api/stocks");

      const data =
        await response.json();

      return data.data;
    },
  });
}