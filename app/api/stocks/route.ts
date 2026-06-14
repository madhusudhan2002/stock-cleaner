import { NextResponse } from "next/server";
import { generateMockStocks } from "@/lib/generateMockStocks";

export async function GET() {
  const stocks = generateMockStocks(5000);

  return NextResponse.json({
    success: true,
    data: stocks,
    total: stocks.length,
  });
}