import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import TextElement from '../Resuable/TextElement';
import colorPalette from '../../utils/colorPalette';

const colors = colorPalette();
interface MarketItemPropsType {
  symbolName: string;
  ask: string;
  bid: string;
  children: JSX.Element | JSX.Element[] | string | any;
}

const BID = 'BID';
const ASK = 'ASK';

const MarketItem: React.FC<MarketItemPropsType> = ({
  children,
  symbolName,
  ask,
  bid,
}) => {
  const currentSymbol = useAppSelector(
    state => state.marketSlice.symbolsObject[symbolName],
  );

  const [askCurrentColor, setAskCurrentColor] = useState(colors.contrast);
  const [bidCurrentColor, setBidCurrentColor] = useState(colors.contrast);

  const askRef = useRef(ask);
  const bidRef = useRef(bid);

  useEffect(() => {
    handleColorChanges(ASK, currentSymbol.ask, askRef.current);
  }, [currentSymbol.ask]);

  useEffect(() => {
    handleColorChanges(BID, currentSymbol.bid, bidRef.current);
  }, [currentSymbol.bid]);

  const handleColorChanges = (
    type: string,
    updateValue: string,
    currentValue: string,
  ) => {
    if (Number(currentValue) - Number(updateValue) < 0) {
      type === ASK
        ? setAskCurrentColor(colors.success)
        : setBidCurrentColor(colors.success);
    } else if (Number(currentValue) - Number(updateValue) > 0) {
      type === ASK
        ? setAskCurrentColor(colors.warning)
        : setAskCurrentColor(colors.warning);
    }

    setTimeout(() => {
      if (type === ASK) {
        askRef.current = updateValue;
        setAskCurrentColor(colors.contrast);
      } else {
        bidRef.current = updateValue;
        setBidCurrentColor(colors.contrast);
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{children}</View>
      <View style={styles.symbolContainer}>
        <TextElement>{currentSymbol.symbol}</TextElement>
        <TextElement fontWeight={'bold'}>{symbolName}</TextElement>
      </View>
      <View style={styles.ratesContainer}>
        <TextElement cStyle={{color: askCurrentColor}}>
          ASK: {currentSymbol.ask}
        </TextElement>
        <TextElement cStyle={{color: bidCurrentColor}}>
          BID: {currentSymbol.bid}
        </TextElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height * 0.1,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.09,
    height: Dimensions.get('window').width * 0.09,
    marginRight: '5%',
  },
  symbolContainer: {
    justifyContent: 'center',
    height: 50,
    width: '56%',
  },
  ratesContainer: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
  },
});

export default MarketItem;
