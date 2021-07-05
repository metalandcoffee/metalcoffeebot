/**
 * Actions when a raid is received.
 */

import { tmi } from './../vendor/tmi.js';
import { seSocket } from './../vendor/se.js';
import { getTwitchChannelInfo } from '../vendor/twitchAPI.js';
import { config } from 'dotenv';

// Load environment variables.
config();

const raidWelcome = async (data) => {
   if ( `raid` === data.type ) {
      
      // Call Twitch API for channel information.
      const broadcasterID = data.data.providerId;
      const channelInfo   = await getTwitchChannelInfo(broadcasterID);

      console.log(`New raid... ${data.data.displayName}`);

      setTimeout(function() {
         tmi.say(process.env.CHANNEL_NAME, `Thanks so much for raiding, @${data.data.displayName} ✨ metala19Hype metala19Hype metala19Hype metala19Hype metala19Hype Welcome to the MC Lounge, raiders! Coffee is in the back. 💀 ☕️ Please remember to remove the '?referral=raid' from your URL so that your view counts!`);
      }, 20000);

      setTimeout(function() {
         tmi.say(process.env.CHANNEL_NAME, `Curious about the amazing streamer that is @${data.data.displayName}? They were last streaming ${channelInfo.data[0].game_name} and the title of their stream was "${channelInfo.data[0].title}". Check them out here 💀 https://twitch.tv/${data.data.username} `);
      }, 30000);
   }
};

seSocket.on('event', raidWelcome);
