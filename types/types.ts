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

export interface SymbolsObjectType {
  // BTCUSD: { ask, bid... }
  [key: string]: SymbolType;
}

export interface SymbolListType {
  // FOREX: [ { ask, bid... }, ... ]
  [key: string]: SymbolType[];
}
