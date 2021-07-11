import Client from 'tmi.js';
import { config } from 'dotenv';

// Load environment variables.
config();

// Define configuration options.
const opts = {
  options: {},
identity: {
  username: process.env.BOT_USERNAME,
  password: process.env.OAUTH_TOKEN
},
channels: [process.env.CHANNEL_NAME]
};

// Create a client with our options.
export const tmi = new Client.client(opts);