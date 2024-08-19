import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch} from '../redux/hooks';
import {setSymbolTree} from '../redux/slices/marketSlice';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamsList = {};

type SplashScreenType = NativeStackScreenProps<RootStackParamsList>;

const SplashScreen: React.FC<SplashScreenType> = ({navigation}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      initApp();
    }, 4000);
  }, []);

  const initApp = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000');
      dispatch(setSymbolTree(response.data));
      // @ts-ignore:
      navigation.navigate('market');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
