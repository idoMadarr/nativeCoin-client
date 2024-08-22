import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MarketScreen from '../screens/MarketScreen';
import {SocketContext} from '../services/socketIO';
import SplashScreen from '../screens/SplashScreen';
import {SymbolType} from '../types/types';
import {useAppDispatch} from '../redux/hooks';
import {setUpdates} from '../redux/slices/marketSlice';
import MarketHeader from '../components/MarketPartials/MarketHeader';

const AppNavigation = () => {
  const AppNavigator = createNativeStackNavigator();

  const socket = useContext(SocketContext) as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('updates', (data: {updates: SymbolType[]}) => {
      dispatch(setUpdates(data.updates));
    });
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{headerShown: false}}>
        <AppNavigator.Screen name={'splash'} component={SplashScreen} />
        <AppNavigator.Screen
          name={'market'}
          component={MarketScreen}
          options={{headerShown: true, header: () => <MarketHeader />}}
        />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
