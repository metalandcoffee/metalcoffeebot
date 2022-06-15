import {vip} from './metalhead-vips.js';
import {tmi} from './../vendor/tmi.js';
import {getTwitchChannelInfo} from '../vendor/twitchAPI.js';

// Track given shoutouts.
const shoutoutsGiven = [];

/**
 *
 * Determine if chatter is on Metalhead VIP list and give shoutout (if not given yet).
 *
 * @param {*} channel
 * @param {*} tags
 * @param {*} message
 * @param {*} self
 * @returns
 */
async function autoShoutOut(channel, tags, message, self) {
  // Ignore messages from the bot.
  if (self) {
    return;
  }

  // List of approved auto-shoutouts.
  const soList = vip;

  // Chatter who sent message.
  const currentChatter = tags.username;

  // Loop through each entry on auto-shoutout list.
  for (const streamer in soList) {
    // Check if the current chatter is in the auto-shoutout list.
    if (streamer.toLowerCase() === currentChatter.toLowerCase()) {
      if (!shoutoutsGiven.includes(streamer.toLowerCase())) {
        // Call Twitch API for channel information.
        const broadcasterID = tags['user-id']; 
        const channelInfo = await getTwitchChannelInfo(broadcasterID);
        const gameName = channelInfo?.data[0].game_name;

        tmi.say(channel, `Metalhead VIP alert 🚨 @${tags['display-name']} is here and deserves your follow! They were last streaming ${gameName}. https://twitch.tv/${tags.username} 🌟`);

        // Record given shoutout.
        shoutoutsGiven.push(streamer.toLowerCase());
      }

      // Break out of loop because match has been found.
      break;
    }
  }
}

// Initialize autoshoutout check on each message sent in chat.
tmi.on(`message`, autoShoutOut);

