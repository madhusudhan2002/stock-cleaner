export interface Stock {
  id: string;
  symbol: string;
  companyName: string;
  sector: string;
  industry: string;
  marketCap: number;
  price: number;
  pe: number;
  pb: number;
  roe: number;
  roce: number;
  eps: number;
  dividendYield: number;
  debtEquity: number;
  currentRatio: number;
  volume: number;
  avgVolume20D: number;
  beta: number;
  changePercent: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
}