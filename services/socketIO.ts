import {createContext} from 'react';
import SocketIO from 'socket.io-client';
import Config from 'react-native-config';

export const socket = SocketIO(Config.PRODUCTION);
export const SocketContext = createContext(socket);
