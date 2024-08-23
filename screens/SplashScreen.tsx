import {
  View,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch} from '../redux/hooks';
import {setSymbolTree} from '../redux/slices/marketSlice';
import LottieView from 'lottie-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import colorPalette from '../utils/colorPalette';
import TextElement from '../components/Resuable/TextElement';
import axiosInstance from '../utils/axiosInstance';

const colors = colorPalette();

type RootStackParamsList = {};

type SplashScreenType = NativeStackScreenProps<RootStackParamsList>;

const SplashScreen: React.FC<SplashScreenType> = ({navigation}) => {
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      initApp();
    }, 3500);
  }, []);

  const initApp = async () => {
    try {
      const data = await axiosInstance.get('/static');
      if (data) {
        dispatch(setSymbolTree(data));
        // @ts-ignore:
        navigation.navigate('market');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
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
      <LottieView
        autoPlay
        loop
        style={{width, height: width}}
        source={require('../assets/animations/splashscreen.json')}
      />
      <View style={styles.description}>
        <TextElement
          cStyle={{textAlign: 'center'}}
          fontSize={'lg'}
          fontWeight={'light'}>
          A cutting-edge trading app that allows users to seamlessly trade
          cryptocurrencies, forex, bonds, and other assets in real-time.
        </TextElement>
        <TextElement fontWeight={'bold'}>- Demo Application -</TextElement>
        <ActivityIndicator color={colors.success} style={styles.indicator} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  description: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: '4%',
    position: 'absolute',
    bottom: '5%',
  },
  indicator: {
    marginTop: '8%',
  },
});

export default SplashScreen;
