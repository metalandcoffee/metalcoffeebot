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
const today = new Date();
const todayStr = today.toLocaleDateString('en-US').replaceAll('/', '-');
let viewers = [];
try {
  viewers = fs.readFileSync(`logs/log-${todayStr}.txt`, `utf8`);
  viewers = viewers.split('\n');
  console.log(viewers);
} catch (err) {
  console.error(err);
}


tmi.on(`join`, (channel, username, self) => {

  // If not in viewers array, add and write to file.
  if (!viewers.includes(username)) {
    viewers.push(username);
    fs.appendFileSync(`logs/log-${todayStr}.txt`, `${username}\n`);
  }
});
seSocket.on('event', (data) => {
  // Data collecting for future enhancements.
  fs.appendFileSync(`logs/streamElementslog.txt`, JSON.stringify(data));
});
