import React, {useCallback, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
// import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppSelector} from '../../redux/hooks';
import MarketItem from './MarketItem';
import {SymbolType} from '../../types/types';
// import {SocketContext} from '../../services/socketIO';
// import { RouteProp } from '@react-navigation/native';

interface MarketListPropsType {
  symbolTracker(viewableSymbols: string[]): void;
  currentCategory: string;
}

// type MarketListType = NativeStackScreenProps<RootStackParamsList>;

const MarketList: React.FC<MarketListPropsType> = ({
  currentCategory,
  symbolTracker,
}) => {
  // const currentCategory = route.name;

  // const socket = useContext(SocketContext) as any;

  const categoryItems = useAppSelector(
    state => state.marketSlice.symbolTree[currentCategory],
  );

  // const symbolTracker = useCallback(async (viewableSymbols: string[]) => {
  //   await socket.emit('tracker', viewableSymbols);
  // }, []);

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
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Text style={{fontSize: 32}}>{currentCategory}</Text>
      <FlatList
        data={Object.values(categoryItems)}
        keyExtractor={itemData => itemData.id}
        contentContainerStyle={styles.flatlist}
        viewabilityConfig={viewConfigRef.current}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        renderItem={({item}) => <MarketItem {...item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  flatlist: {
    alignItems: 'center',
  },
});

export default MarketList;
