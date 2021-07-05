import fs from 'fs';
import { config } from 'dotenv';
import { tmi } from './vendor/tmi.js';
import { seSocket } from './vendor/se.js';

import './components/follow.js';
import './components/autoshoutout.js';
import './components/raid.js';

// Load environment variables.
config();

// Connect to Twitch Chat.
tmi.connect();

// On successful connection...
const onConnected = (addr, port) => {
  console.log(`Connected to Twitch chat.`);
  tmi.say(process.env.CHANNEL_NAME, `Hi there.`);
}
tmi.on(`connected`, onConnected);

// Logging.
tmi.on(`join`, (channel, username, self) => {
  const today = new Date();
  fs.appendFileSync(`log.txt`, `[${today.toLocaleString('en-US', { timeZone: 'America/New_York' })}] ${username} has joined channel. \n`);
});
seSocket.on('event', (data) => {
  // Data collecting for future enhancements.
  fs.appendFileSync(`streamElementslog.txt`, JSON.stringify(data));
});
