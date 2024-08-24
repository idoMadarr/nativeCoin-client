import React, {useCallback, useContext} from 'react';
import MarketList from '../components/MarketPartials/MarketList';
import {useAppSelector} from '../redux/hooks';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {SocketContext} from '../services/socketIO';
import colorPalette from '../utils/colorPalette';
import axiosInstance from '../utils/axiosInstance';

const colors = colorPalette();

const Tab = createMaterialTopTabNavigator();

const MarketScreen = () => {
  const {width, height} = useWindowDimensions();

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
    await axiosInstance.post('/viewable', {
      viewableSymbols,
      userId: socket.id,
    });
  };

  const optimizeSearchFunc = useCallback(debounce(fetchViewableSymbols), []);

  const symbolTracker = useCallback(async (viewableSymbols: string[]) => {
    optimizeSearchFunc(viewableSymbols);
  }, []);

  return (
    <Tab.Navigator
      tabBarPosition={'bottom'}
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarAllowFontScaling: false,
        tabBarIndicatorContainerStyle: styles.tabBarIndicatorContainerStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: {
          height: height * 0.08,
          width: width * 0.33,
          borderTopWidth: 1,
          borderColor: colors.contrast,
        },
        lazyPlaceholder: () => <View style={styles.placeholder} />,
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

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  tabBarLabelStyle: {
    fontSize: 16,
    color: colors.contrast,
  },
  tabBarIndicatorContainerStyle: {
    backgroundColor: colors.primary,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.contrast,
  },
});

export default MarketScreen;
