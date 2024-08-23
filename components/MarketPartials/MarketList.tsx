import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import MarketItem from './MarketItem';
import {SymbolType} from '../../types/types';
import colorPalette from '../../utils/colorPalette';

const colors = colorPalette();
const INIT_PAGE = 1;
const DISPLAY_PER_BATCH = 16;

interface MarketListPropsType {
  symbolTracker(viewableSymbols: string[]): void;
  currentCategory: string;
}
const MarketList: React.FC<MarketListPropsType> = ({
  currentCategory,
  symbolTracker,
}) => {
  const symbolsList = useAppSelector(
    state => state.marketSlice.symbolsList[currentCategory],
  );

  const [currentPage, setCurrentPage] = useState<number>(INIT_PAGE);
  const [displaySymbols, setDisplaySymbols] = useState<SymbolType[]>([]);

  const indexOfLastList = currentPage * DISPLAY_PER_BATCH;
  const indexOfFirstList = indexOfLastList - DISPLAY_PER_BATCH;

  const onEndReached = () => setCurrentPage(prevState => prevState + 1);

  useEffect(() => {
    const loadSymbols = symbolsList.slice(indexOfFirstList, indexOfLastList);
    setDisplaySymbols(prevState => prevState.concat(loadSymbols));
  }, [currentPage]);

  const viewConfigRef = useRef({
    minimumViewTime: 800,
    viewAreaCoveragePercentThreshold: 0,
  });

  const onViewRef = useRef(({viewableItems}: any) => {
    const viewableSymbols: string[] = viewableItems.map(
      ({item}: {item: SymbolType}) => item.symbolName,
    );
    symbolTracker(viewableSymbols);
  });

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <FlatList
        data={displaySymbols}
        keyExtractor={itemData => itemData.id}
        contentContainerStyle={styles.flatlist}
        viewabilityConfig={viewConfigRef.current}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        initialNumToRender={10}
        // removeClippedSubviews={true}
        onEndReachedThreshold={0}
        onEndReached={onEndReached}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        renderItem={({item}) => (
          <MarketItem
            symbolName={item.symbolName}
            ask={item.ask}
            bid={item.bid}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.primary,
  },
  flatlist: {
    alignItems: 'center',
  },
  seperator: {
    height: 1,
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: colors.contrast,
  },
});

export default MarketList;
