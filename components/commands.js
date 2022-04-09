// External dependencies.
import {createRequire} from 'module';
import {tmi} from './../vendor/tmi.js';

// Internal dependencies.
import {getTwitchChannelInfo, getUserInfo} from '../vendor/twitchAPI.js';

const require = createRequire(import.meta.url);
const commands = require('./tmp/commands.json');

/**
 * Listen for commands in chat.
 * @param {string} channel
 * @param {object} tags
 * @param {string} message
 * @param {boolean} self
 * @return {void}
 */
async function commandProcessor(channel, tags, message, self) {
  // Ignore messages from the bot.
  if (self) {
    return;
  }

  // Check if messages contains any of the commands in json.
  for (const prop in commands) {
    if (message.startsWith(`!${prop}`)) {
      if ('so' === prop) {
        if (false === tags.mod && (!tags.badges || !tags.badges.broadcaster)) {
          return;
        }
        const [, username] = message.split(`@`);
        if (undefined === username) {
          return;
        }
        const userObj = await getUserInfo(username);
        console.log(userObj);
        if ( userObj.data.length < 0) {
          return;
        }
        const id = userObj.data[0].id;
        const channelInfo = await getTwitchChannelInfo(id);
        const title = channelInfo.data[0].title;

        let cmdMsg = commands[prop];
        cmdMsg = cmdMsg.replace(`{username}`, username);
        cmdMsg = cmdMsg.replace(`{stream-title}`, title);
        cmdMsg = cmdMsg.replace(`{url}`, `https://twitch.tv/${username}`);
        tmi.say(channel, cmdMsg);
      } else {
        console.log(`Sending command "${prop}: ${commands[prop]}"`);
        tmi.say(channel, commands[prop]);
      }
    }
  }
}

// Initialize command processor on each message sent in chat.
tmi.on(`message`, commandProcessor);
