import { createRequire } from "module";
import { tmi } from './../vendor/tmi.js';

const require = createRequire(import.meta.url);
const commands = require('./timers.json');

// Handle message timers.
async function messageTimers(channel, tags, message, self) {


}

// Initialize command processor on each message sent in chat.
//tmi.on(`message`, commandProcessor);