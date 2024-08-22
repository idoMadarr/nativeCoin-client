import React from 'react';
import {StyleSheet, Text} from 'react-native';
// import EStyleSheet from 'react-native-extended-stylesheet';
import colorPalette from '../../utils/colorPalette';

const colors = colorPalette();

interface TextElementType {
  children: JSX.Element | JSX.Element[] | string | any;
  fontSize?: string;
  fontWeight?: string;
  cStyle?: object;
  numberOfLines?: number;
}

const TextElement: React.FC<TextElementType> = ({
  children,
  fontSize,
  fontWeight,
  cStyle = {},
  numberOfLines,
}) => {
  //   const setFontSize = (size: string = 'm') => {
  //     const fontSize =
  //       size === 'sm'
  //         ? '0.9rem'
  //         : size === 'm'
  //         ? '1rem'
  //         : size === 'lg'
  //         ? '1.2rem'
  //         : '2rem';

  //     return fontSize;
  //   };

  const setFontFamily = (font?: string) => {
    return font === 'bold'
      ? 'PloniMLv2AAA-Bold'
      : font === 'light'
      ? 'PloniMLv2AAA-Light'
      : 'PloniMLv2AAA-Regular';
  };

  const styles = StyleSheet.create({
    constants: {
      fontSize: 16,
      fontFamily: setFontFamily(fontWeight),
      color: colors.contrast,
    },
  });

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.constants, {...cStyle}]}
      allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default TextElement;
