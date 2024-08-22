import {createSlice} from '@reduxjs/toolkit';
import {SymbolsObjectType, SymbolType, SymbolListType} from '../../types/types';

interface RootStateApp {
  symbolsObject: SymbolsObjectType;
  categories: string[];
  symbolsList: SymbolListType;
}

const initialState: RootStateApp = {
  categories: [],
  symbolsObject: {},
  symbolsList: {},
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setSymbolTree: (state, action) => {
      state.categories = action.payload.categories;
      state.symbolsObject = action.payload.symbolsObject;
      state.symbolsList = action.payload.symbolsList;
    },
    setUpdates: (state, action) => {
      const updates: SymbolType[] = action.payload;

      for (const update of updates) {
        state.symbolsObject[update.symbolName].bid = update.bid;
        state.symbolsObject[update.symbolName].ask = update.ask;
        // ...
      }
    },
  },
});

export const {setSymbolTree, setUpdates} = marketSlice.actions;

export default marketSlice.reducer;
