import fs from 'fs';
import { config } from 'dotenv';
import tmi from 'tmi.js';
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

// Connect to Twitch.
client.connect();

// Called everytime the bot connects to Twitch chat.
const onConnected = (addr, port) => {
  console.log(`connected to Twitch chat.`);
  client.say(process.env.CHANNEL_NAME, `Hi there.`);
}

client.on(`connected`, onConnected);

// Called everytime a message is sent in Twitch chat.
client.on(`message`, autoShoutOut.bind(client));

// Logging
client.on(`join`, (channel, username, self) => {
  const today = new Date();
  ;
  fs.appendFileSync(`log.txt`, `[${today.toLocaleString('en-US', { timeZone: 'America/New_York' })}] ${username} has joined channel. \n`);
});
client.on(`part`, (channel, username, self) => {
  const today = new Date();
  fs.appendFileSync(`log.txt`, `[${today.toLocaleString('en-US', { timeZone: 'America/New_York' })}] ${username} has left channel. \n`);
});
