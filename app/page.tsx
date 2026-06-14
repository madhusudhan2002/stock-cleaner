import { generateMockStocks } from "@/lib/generateMockStocks";
import StockTable from "@/components/StockTable";

export default function Home() {
  const stocks =
    generateMockStocks(100);

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        Real-Time Stock Screener
      </h1>

      <StockTable data={stocks} />
    </main>
  );
}