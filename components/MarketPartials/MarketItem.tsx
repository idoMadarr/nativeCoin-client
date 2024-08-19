import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {SymbolType} from '../../types/types';

const MarketItem: React.FC<SymbolType> = ({symbolName, ask, bid}) => {
  return (
    <View style={styles.container}>
      <Text>{symbolName}</Text>
      <Text>ASK: {ask}</Text>
      <Text>BID: {bid}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height * 0.2,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default MarketItem;
