import {createContext} from 'react';
import SocketIO from 'socket.io-client';

export const socket = SocketIO('http://10.0.2.2:3000');
export const SocketContext = createContext(socket);
