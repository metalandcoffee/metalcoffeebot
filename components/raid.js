/**
 * Actions when a raid is received.
 */

import {tmi} from '../vendor/tmi.js';
import {getTwitchChannelInfo} from '../vendor/twitchAPI.js';
import {config} from 'dotenv';
import {logColorMsg} from './../helpers.js';

// Load environment variables.
config();
const raidWelcome = async (username, displayName, broadcasterID) => {
  // Call Twitch API for channel information.
  const channelInfo = await getTwitchChannelInfo(broadcasterID);

  logColorMsg(`New raid... ${displayName}`);

  setTimeout(function() {
    tmi.say(process.env.CHANNEL_NAME, `Thanks so much for raiding, @${displayName} ✨ metala19Hype metala19Hype metala19Hype metala19Hype metala19Hype Welcome to the MC Lounge, raiders! Coffee is in the back. 💀 ☕️`);
  }, 20000);

  setTimeout(function() {
    tmi.say(process.env.CHANNEL_NAME, `Curious about the amazing streamer that is @${displayName}? They were last streaming ${channelInfo.data[0].game_name} and the title of their stream was "${channelInfo.data[0].title}". Check them out here 💀 https://twitch.tv/${username} `);
  }, 30000);
};

export default raidWelcome;
