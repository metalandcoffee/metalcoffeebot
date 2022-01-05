import { createRequire } from "module";
import { tmi } from './../vendor/tmi.js';

const require = createRequire(import.meta.url);
const commands = require('./commands.json');

// Listen for commands.
async function commandProcessor(channel, tags, message, self) {
    // Ignore messages from the bot.
    if (self) {
        return;
    }

    // Check if messages contains any of the commands in json.
    for (const prop in commands) {
        if (message === `!${prop}`) {
            console.log(`Sending command "${prop}: ${commands[prop]}"`);
            tmi.say(channel, commands[prop]);
        }
    }


}

// Initialize command processor on each message sent in chat.
tmi.on(`message`, commandProcessor);