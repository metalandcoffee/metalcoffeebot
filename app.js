import { config } from "dotenv";
import tmi from "tmi.js";
import { autoShoutOut } from './components/autoshoutout.js';
import './components/twitchAPI.js';

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

// Register our event handlers (defined below)
client.on("message", autoShoutOut.bind(client));
//client.on("connected", onConnectedHandler);

// Connect to Twitch:
await client.connect();

client.say(process.env.CHANNEL_NAME,"Hi there");

// Called every time the bot connects to Twitch chat
// function onConnectedHandler(addr, port) {
//   console.log(`* Connected to ${addr}:${port}`);
// }
