/**
 * Connect to StreamElements API via WebSocket.
 * 
 * @link https://dev.streamelements.com/docs/kappa/docs/Websockets.md
 */

import { config } from "dotenv";
import io from 'socket.io-client';

// Load environment variables.
config();

const socket = io('https://realtime.streamelements.com', {
    transports: ['websocket']
});

const onConnect = () => {
    socket.emit('authenticate', {method: 'jwt', token: process.env.SE_JWT});
    console.log('Successfully connected to the websocket');
};

const onDisconnect = (reason) => {
    console.log('Disconnected from the websocket');
    console.log(reason);
};

function onAuthenticated(data) {
    const {
        channelId
    } = data;
    console.log(`Successfully connected to channel ${channelId}`);
}

// Socket connected.
socket.on('connect', onConnect);

// Socket got disconnected.
socket.on('disconnect', onDisconnect);

// Socket is authenticated.
socket.on('authenticated', onAuthenticated);
socket.on('unauthorized', console.error);


socket.on('event', (data) => {
    console.log(data);
});
