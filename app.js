import { config } from "dotenv";
import tmi from "tmi.js";
import { autoShoutOut } from './components/autoshoutout.js';
import './components/twitchAPI.js';
import './components/streamElementsAPI.js';

config();

// Define configuration options.
const opts = {
    options: { debug:true },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};

// Create a client with our options.
const client = new tmi.client(opts);

// Called everytime the bot connects to Twitch chat.
const onConnected = (addr, port) => {
  client.say(process.env.CHANNEL_NAME, `Hi there.`);
}

client.on(`connected`, onConnected);

// Called everytime a message is sent in Twitch chat.
client.on(`message`, autoShoutOut.bind(client));
