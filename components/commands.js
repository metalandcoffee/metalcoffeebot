// External dependencies.
import {createRequire} from 'module';
import fetch from 'node-fetch';
import {tmi} from './../vendor/tmi.js';

// Internal dependencies.
import {getTwitchChannelInfo, getUserInfo} from '../vendor/twitchAPI.js';

const require = createRequire(import.meta.url);
const commands = require('./db/commands.json');

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

  const cmd = message.split(' ')[0];

  const isShoutOut = await shoutOutCmd(cmd, tags, message, channel);
  const isCurrentSong = await songCmd(cmd, tags, message, channel);
  const isRecentPlays = await recentPlaysCmd(cmd, tags, message, channel);

  // Check its command is the shoutout.
  if (isShoutOut || isCurrentSong || isRecentPlays) {
    return;
  }

  // Check if messages contains any of the commands in json.
  for (const prop in commands) {
    if (cmd === `!${prop}`) {
      tmi.say(channel, commands[prop]);
      return;
    }
  }
}

const shoutOutCmd = async (cmd, tags, message, channel) => {
  if ('!so' !== cmd) {
    return false;
  }

  // If not moderator or broadcaster, return.
  if (false === tags.mod && (!tags.badges || !tags.badges.broadcaster)) {
    return false;
  }

  const [, username] = message.split(`@`);
  if (undefined === username) {
    return false;
  }
  const userObj = await getUserInfo(username);
  if ( userObj.data.length < 0) {
    return false;
  }
  const id = userObj.data[0].id;
  const channelInfo = await getTwitchChannelInfo(id);
  const title = channelInfo.data[0].title;

  let cmdMsg = commands['so'];
  cmdMsg = cmdMsg.replace(`{username}`, username);
  cmdMsg = cmdMsg.replace(`{stream-title}`, title);
  cmdMsg = cmdMsg.replace(`{url}`, `https://twitch.tv/${username}`);
  tmi.say(channel, cmdMsg);
  return true;
};

const songCmd = async (cmd, tags, message, channel) => {
  if ('!song' !== cmd) {
    return false;
  }

  const response = await fetch('https://metal-plays-spotify-proxy.herokuapp.com/current');
  const jsonObj = await response.json();
  tmi.say(channel, `The current song is ${jsonObj.trackName} by
    ${jsonObj.artists}: ${jsonObj.songPreviewURL}`);
};

const recentPlaysCmd = async (cmd, tags, message, channel) => {
  if ('!recent' !== cmd) {
    return false;
  }

  const response = await fetch('https://metal-plays-spotify-proxy.herokuapp.com/played');
  const jsonObj = await response.json();
  const recentTracks = [];
  for (let i = 0; i < 5; i++) {
    recentTracks.push(`${jsonObj[i].artists.join(', ')} - ${jsonObj[i].trackName}`);
  }
  tmi.say(channel, recentTracks.join(', '));
};

// Initialize command processor on each message sent in chat.
tmi.on(`message`, commandProcessor);
