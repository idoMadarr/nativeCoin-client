import React, {useRef} from 'react';
import {
  View,
  Text,
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
        data={symbolsList}
        keyExtractor={itemData => itemData.id}
        contentContainerStyle={styles.flatlist}
        viewabilityConfig={viewConfigRef.current}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        initialNumToRender={16}
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
