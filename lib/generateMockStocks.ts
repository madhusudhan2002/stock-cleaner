import { Stock } from "@/types/stock";

const sectors = [
  "IT",
  "Banking",
  "Pharma",
  "Auto",
  "FMCG",
  "Energy",
  "Metal",
];

const companies = [
  { symbol: "RELIANCE", companyName: "Reliance Industries" },
  { symbol: "TCS", companyName: "Tata Consultancy Services" },
  { symbol: "INFY", companyName: "Infosys" },
  { symbol: "HDFCBANK", companyName: "HDFC Bank" },
  { symbol: "ICICIBANK", companyName: "ICICI Bank" },
  { symbol: "SBIN", companyName: "State Bank of India" },
  { symbol: "ITC", companyName: "ITC Ltd" },
  { symbol: "LT", companyName: "Larsen & Toubro" },
  { symbol: "WIPRO", companyName: "Wipro" },
  { symbol: "BAJFINANCE", companyName: "Bajaj Finance" },
  { symbol: "HCLTECH", companyName: "HCL Technologies" },
  { symbol: "ASIANPAINT", companyName: "Asian Paints" },
  { symbol: "MARUTI", companyName: "Maruti Suzuki" },
  { symbol: "SUNPHARMA", companyName: "Sun Pharmaceutical" },
  { symbol: "TATAMOTORS", companyName: "Tata Motors" },
  { symbol: "ULTRACEMCO", companyName: "UltraTech Cement" },
  { symbol: "NESTLEIND", companyName: "Nestle India" },
  { symbol: "AXISBANK", companyName: "Axis Bank" },
  { symbol: "KOTAKBANK", companyName: "Kotak Mahindra Bank" },
  { symbol: "POWERGRID", companyName: "Power Grid Corporation" },
];

export function generateMockStocks(
  count: number = 5000
): Stock[] {
  return Array.from(
    { length: count },
    (_, i) => {
      const company =
        companies[i % companies.length];

      return {
        id: crypto.randomUUID(),

        symbol: company.symbol,

        companyName:
          company.companyName,

        sector:
          sectors[
            Math.floor(
              Math.random() *
                sectors.length
            )
          ],

        industry: "General",

        marketCap: Math.floor(
          Math.random() * 1000000
        ),

        price: +(
          Math.random() * 5000
        ).toFixed(2),

        pe: +(
          Math.random() * 50
        ).toFixed(2),

        pb: +(
          Math.random() * 10
        ).toFixed(2),

        roe: +(
          Math.random() * 30
        ).toFixed(2),

        roce: +(
          Math.random() * 30
        ).toFixed(2),

        eps: +(
          Math.random() * 200
        ).toFixed(2),

        dividendYield: +(
          Math.random() * 10
        ).toFixed(2),

        debtEquity: +(
          Math.random() * 5
        ).toFixed(2),

        currentRatio: +(
          Math.random() * 5
        ).toFixed(2),

        volume: Math.floor(
          Math.random() * 10000000
        ),

        avgVolume20D: Math.floor(
          Math.random() * 10000000
        ),

        beta: +(
          Math.random() * 3
        ).toFixed(2),

        changePercent: +(
          Math.random() * 20 - 10
        ).toFixed(2),

        fiftyTwoWeekHigh: +(
          Math.random() * 6000
        ).toFixed(2),

        fiftyTwoWeekLow: +(
          Math.random() * 500
        ).toFixed(2),
      };
    }
  );
}