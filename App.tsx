import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SocketContext, socket} from './services/socketIO';
import AppNavigation from './navigation/AppNavigation';
import {LogBox} from 'react-native';

EStyleSheet.build({});

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <AppNavigation />
      </SocketContext.Provider>
    </Provider>
  );
};

export default App;
