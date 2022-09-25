// External dependencies.
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';
import {config} from 'dotenv';
import express from 'express';
import {tmi} from './vendor/tmi.js';
import {logColorMsg} from './helpers.js';
import connectTAU from './vendor/tau.js';

// Internal dependencies.
import {home, addCommand} from './express.js';
import './components/autoshoutout.js';
import './components/commands.js';
import './components/timers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express functions.
const app = express();
const port = 3001;
app.listen(port, () => {
  logColorMsg(`Example app listening at http://localhost:${port}`);
});
// Express: Serve images, CSS files, and JavaScript files
// in a directory named public.
app.use(express.static(__dirname + '/public'));
app.get('/', home);
app.post('add-command', addCommand);

// Load environment variables.
config();

// Connect to Twitch Chat.
tmi.connect();

// Temp Function
tmi.on(`message`, function(channel, tags, message, self) {
  if (!self) {
    logColorMsg(`${tags.username}: ${message}`);
  }
});

// On successful connection...
const onConnected = (addr, port) => {
  logColorMsg(`Connected to Twitch chat.`);
  tmi.say(process.env.CHANNEL_NAME, `Hi there.`);
  connectTAU();
};
tmi.on(`connected`, onConnected);

// Logging.
const today = new Date();
const todayStr = today.toLocaleDateString().split('/').join('-');
let viewers = [];
try {
  viewers = fs.readFileSync(`logs/log-${todayStr}.txt`, `utf8`);
  viewers = viewers.split('\n');
  // console.log(viewers);
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

