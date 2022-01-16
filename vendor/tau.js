/**
 * Connect to TAU (local instance) via WebSocket.
 * 
 * @link https://dev.streamelements.com/docs/kappa/docs/Websockets.md
 */
import { logColorMsg } from './../helpers.js';
import { config } from 'dotenv';
import io from 'socket.io-client';

// Load environment variables.
config();

export const tau = io('ws://localhost:8000/ws/twitch-events/', {
    transports: ['websocket'],
    auth: {
        token: process.env.TAU_AUTH_TOKEN
    }
});

const onConnect = () => {
    //seSocket.emit('authenticate', { method: 'jwt', token: process.env.SE_JWT });
    logColorMsg('Successfully connected to the TAU');
};

const onDisconnect = (reason) => {
    logColorMsg('Disconnected from the TAU');
    logColorMsg(reason);
};

const onAuthenticated = (data) => {
    const {
        channelId
    } = data;
    logColorMsg(`Successfully connected to channel ${channelId} from TAU`);
};

// Socket connected.
tau.on('connect', onConnect);

// Socket got disconnected.
tau.on('disconnect', onDisconnect);

// Socket is authenticated.
tau.on('authenticated', onAuthenticated);
tau.on('unauthorized', console.error);
