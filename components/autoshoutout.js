import { vip } from './metalhead-vips.js';
import { isWithinThreeHours } from '../helpers.js';

// Called every time a message comes in.
export function autoShoutOut(channel, tags, message, self) {
  // Ignore messages from the bot.
  if (self) {
    return;
  }

  // List of approved auto-shoutouts.
  let soList = vip;

  const currentChatter = tags.username;
  
  // Loop through each entry on auto-shoutout list.
  for (const streamer in soList) {

    // Check if the current chatter is in the auto-shoutout list (metalhead-vips.json).
    if (streamer.toLowerCase() === currentChatter.toLowerCase()) {
      
      // Check to see if last given shoutout happened within the past 24 hours.
      const givenRecentShoutOut = isWithinThreeHours( soList[streamer] );
      console.log(givenRecentShoutOut, soList[streamer], soList);
      
      if (!givenRecentShoutOut) {
        this.say(channel, `Metalhead VIP alert 🚨 @${tags['display-name']} is here and deserves your follow! https://twitch.tv/${tags.username} 🌟`);
        soList[streamer] = Date.now();
        
        
        
        // Update autoshout-list with lastest shoutout date/times. Store it in an array/memory. Empty array out before each stream.
        // fs.writeFile('./components/metalhead-vips.json', JSON.stringify(soList), function writeJSON(err) {
        //   if (err) return console.log(err);
        //   console.log(JSON.stringify(soList));
        //   console.log(fileName + ' saved!');
        // });
      }
      
      // Break out of loop because match has been found.
      break;
    }  
  }
};
