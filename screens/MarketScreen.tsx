import React, {useCallback, useContext} from 'react';
import MarketList from '../components/MarketPartials/MarketList';
import {useAppSelector} from '../redux/hooks';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useWindowDimensions, View} from 'react-native';
import {SocketContext} from '../services/socketIO';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();

const MarketScreen = () => {
  const {width} = useWindowDimensions();

  const categories = useAppSelector(state => state.marketSlice.categories);

  const socket = useContext(SocketContext) as any;

  const debounce = (func: Function, delay: number = 500) => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(...args);
      }, delay);
    };
  };

  const fetchViewableSymbols = async (viewableSymbols: string[]) => {
    try {
      await axios.post('http://10.0.2.2:3000/viewable', {
        viewableSymbols,
        userId: socket.id,
      });
    } catch (error) {
      console.log(`Error while sending data... ${error}`);
    }
  };

  const optimizeSearchFunc = useCallback(debounce(fetchViewableSymbols), []);

  const symbolTracker = useCallback(async (viewableSymbols: string[]) => {
    optimizeSearchFunc(viewableSymbols);
  }, []);

  return (
    <Tab.Navigator
      tabBarPosition={'bottom'}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {width: width * 0.33},
        tabBarLabelStyle: {fontSize: 12},
        lazy: true,
        lazyPlaceholder: () => (
          <View style={{flex: 1, backgroundColor: 'white'}} />
        ),
        tabBarAllowFontScaling: false,
      }}>
      {categories.map(category => (
        <Tab.Screen
          key={category}
          name={category}
          children={() => (
            <MarketList
              currentCategory={category}
              symbolTracker={symbolTracker}
            />
          )}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MarketScreen;
