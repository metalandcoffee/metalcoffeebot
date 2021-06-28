import fs from 'fs';
import { config } from 'dotenv';
import tmi from 'tmi.js';
import './vendor/twitchAPI.js';
import './vendor/streamElementsAPI.js';
import initAutoshoutout from './components/autoshoutout.js';

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

// Connect to Twitch.
client.connect();

// On successfully connection, make TMI client a global variable (accessible anywhere).
const onConnected = (addr, port) => {
  console.log(`connected to Twitch chat.`);
  client.say(process.env.CHANNEL_NAME, `Hi there.`);
  global.tmiClient = client;
  initAutoshoutout();
}

client.on(`connected`, onConnected);

// Logging
client.on(`join`, (channel, username, self) => {
  const today = new Date();
  fs.appendFileSync(`log.txt`, `[${today.toLocaleString('en-US', { timeZone: 'America/New_York' })}] ${username} has joined channel. \n`);
});
