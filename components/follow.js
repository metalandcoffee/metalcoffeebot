import {tmi} from '../vendor/tmi.js';
import {config} from 'dotenv';
import {logColorMsg} from '../helpers.js';

// Load environment variables.
config();

export default function followNotif(username) {
  logColorMsg(`New follower ${username}`);
  tmi.say(process.env.CHANNEL_NAME, `Welcome to the MC Lounge, @${username} metala19Headbang Coffee is in the back.`);
}
