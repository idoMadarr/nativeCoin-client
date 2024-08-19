export interface SymbolType {
  ask: string;
  bid: string;
  display: string;
  id: string;
  max: string;
  min: string;
  perc: string;
  rateUpdateTime: string;
  symbol: string;
  symbolName: string;
  type: string;
  popularity?: undefined;
}

export interface SymbolTreeType {
  [key: string]: {
    [key: string]: SymbolType;
  };
}
