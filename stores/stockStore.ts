import { create } from "zustand";
import { Stock } from "@/types/stock";

interface StockStore {
  stocks: Stock[];
  watchlist: string[];

  setStocks: (stocks: Stock[]) => void;

  addToWatchlist: (symbol: string) => void;

  removeFromWatchlist: (symbol: string) => void;
}

export const useStockStore =
  create<StockStore>((set) => ({
    stocks: [],

    watchlist: [],

    setStocks: (stocks) =>
      set({ stocks }),

    addToWatchlist: (symbol) =>
      set((state) => ({
        watchlist: [
          ...state.watchlist,
          symbol,
        ],
      })),

    removeFromWatchlist: (symbol) =>
      set((state) => ({
        watchlist:
          state.watchlist.filter(
            (s) => s !== symbol
          ),
      })),
  }));