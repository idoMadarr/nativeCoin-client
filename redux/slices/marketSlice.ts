import {createSlice} from '@reduxjs/toolkit';
import {SymbolTreeType, SymbolType} from '../../types/types';

interface RootStateApp {
  symbolTree: SymbolTreeType;
  categories: string[];
}

const initialState: RootStateApp = {
  symbolTree: {},
  categories: [],
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setSymbolTree: (state, action) => {
      state.symbolTree = action.payload;
      state.categories = Object.keys(action.payload);
    },
    setUpdates: (state, action) => {
      const updates: SymbolType[] = action.payload;

      for (const update of updates) {
        state.symbolTree[update.type][update.symbolName].bid = update.bid;
        state.symbolTree[update.type][update.symbolName].ask = update.ask;
        // ...
      }
    },
  },
});

export const {setSymbolTree, setUpdates} = marketSlice.actions;

export default marketSlice.reducer;
