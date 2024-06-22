// External dependencies.
import {createRequire} from 'module';
import {tmi} from './../vendor/tmi.js';
import {logColorMsg} from '../helpers.js';
import fs from 'fs';

// Internal dependencies.
import {getTwitchChannelInfo, getUserInfo} from '../vendor/twitchAPI.js';

const require = createRequire(import.meta.url);
const commands = require('./db/commands.json');
const today = new Date();
const todayStr = today.toLocaleDateString().split('/').join('-');

// Set up variables.
let requestQueue = [];
try {
  requestQueue = fs.readFileSync(`request-queue/queue-${todayStr}.txt`, `utf8`);
  requestQueue = requestQueue.trim().split('\n');
  console.log('😌😌😌');
  console.log(requestQueue);
} catch (err) {
  logColorMsg(`Request queue file does not exist yet.`);
}

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

	const msg = message.trim().split(' ');
	let cmdFulfilled = false;

	// Special actions for specific commands.
	if ('!request' === msg[0] && msg[1]) {
		cmdFulfilled = requestSong(tags.username, msg);
	}
		
	// Check if command has been fulfilled already...
	if (cmdFulfilled) {
		return;
	}

	// Check if messages contains any of the commands in json.
	for (const prop in commands) {
		if (msg[0] === `!${prop}`) {
			tmi.say(channel, commands[prop]);
			return;
		}
	}
}

const requestSong = (username, message) => {
	message.shift();
	requestQueue.push[message.join(' ')];
	fs.appendFileSync(`request-queue/queue-${todayStr}.txt`, `@${username} ${message.join(' ')}\n`);
	return true;
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
		if (userObj.data.length < 0) {
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



// Initialize command processor on each message sent in chat.
tmi.on(`message`, commandProcessor);
