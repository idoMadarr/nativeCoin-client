import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import TextElement from '../Resuable/TextElement';
import colorPalette from '../../utils/colorPalette';

const colors = colorPalette();

const MarketHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.content}>
        <TextElement fontSize={'xl'}>
          Native
          <TextElement
            fontSize={'xl'}
            fontWeight={'bold'}
            cStyle={{color: colors.success}}>
            C
          </TextElement>
          oin
        </TextElement>
        <TextElement>
          Trading app for crypto, forex, bonds, indices and more, offering
          real-time (demo) data.
        </TextElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.15,
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderColor: colors.contrast,
  },
  content: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.85,
  },
});

export default MarketHeader;
