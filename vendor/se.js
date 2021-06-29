/**
 * Connect to StreamElements API via WebSocket.
 * 
 * @link https://dev.streamelements.com/docs/kappa/docs/Websockets.md
 */
 import fs from 'fs';
import { config } from 'dotenv';
import io from 'socket.io-client';

// Load environment variables.
config();

const onConnect = () => {
    seSocket.emit('authenticate', {method: 'jwt', token: process.env.SE_JWT});
    console.log('Successfully connected to the websocket');
};

const onDisconnect = (reason) => {
    console.log('Disconnected from the websocket');
    console.log(reason);
};

const onAuthenticated = (data) => {
    const {
        channelId
    } = data;
    console.log(`Successfully connected to channel ${channelId}`);
};

export const seSocket = io('https://realtime.streamelements.com', {
    transports: ['websocket']
});

// Socket connected.
seSocket.on('connect', onConnect);

// Socket got disconnected.
seSocket.on('disconnect', onDisconnect);

// Socket is authenticated.
seSocket.on('authenticated', onAuthenticated);
seSocket.on('unauthorized', console.error);
