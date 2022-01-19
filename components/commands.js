// External dependencies.
import { createRequire } from "module";
import { tmi } from './../vendor/tmi.js';

// Internal dependencies.
import { getTwitchChannelInfo, getUserInfo } from '../vendor/twitchAPI.js';

const require = createRequire(import.meta.url);
const commands = require('./tmp/commands.json');

// Listen for commands.
async function commandProcessor(channel, tags, message, self) {

    // Ignore messages from the bot.
    if (self) {
        return;
    }

    // Check if messages contains any of the commands in json.
    for (const prop in commands) {
        if (message.startsWith(`!${prop}`)) {
            if ('so' === prop) {
                const [, username] = message.split(`@`);
                const userObj = await getUserInfo(username);
                const id = userObj.data[0].id;
                const channelInfo = await getTwitchChannelInfo(id);
                const title = channelInfo.data[0].title;
                commands[prop] = commands[prop].replace(`{username}`, username);
                commands[prop] = commands[prop].replace(`{stream-title}`, title);
                commands[prop] = commands[prop].replace(`{url}`, `https://twitch.tv/${username}`);
                //const found = commands[prop].match(/{([^ ]*)}/gi);
                //console.log(found);
                tmi.say(channel, commands[prop]);
            } else {
                console.log(`Sending command "${prop}: ${commands[prop]}"`);
                tmi.say(channel, commands[prop]);
            }
        }
    }


}

// Initialize command processor on each message sent in chat.
tmi.on(`message`, commandProcessor);