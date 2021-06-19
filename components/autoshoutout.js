import { vip } from './metalhead-vips.js';
import getTwitchChannelInfo from './twitchAPI.js';

const shoutoutsGiven = [];

// Called every time a message comes in.
export async function autoShoutOut(channel, tags, message, self) {

  // Ignore messages from the bot.
  if (self) {
    return;
  }

  // List of approved auto-shoutouts.
  let soList = vip;

  // Chatter who sent message.
  const currentChatter = tags.username;
  
  // Loop through each entry on auto-shoutout list.
  for (const streamer in soList) {

    // Check if the current chatter is in the auto-shoutout list (metalhead-vips.json).
    if (streamer.toLowerCase() === currentChatter.toLowerCase()) {
      
      if (!shoutoutsGiven.includes(streamer.toLowerCase())) {
        // Call Twitch API for channel information.
        const broadcasterID = tags['user-id'];
        const channelInfo = await getTwitchChannelInfo(broadcasterID);

        this.say(channel, `Metalhead VIP alert 🚨 @${tags['display-name']} is here and deserves your follow! They were last streaming ${channelInfo.data[0].game_name}. https://twitch.tv/${tags.username} 🌟`);

        // Record given shoutout.
        shoutoutsGiven.push(streamer.toLowerCase());
      }
      
      // Break out of loop because match has been found.
      break;
    }  
  }
};
