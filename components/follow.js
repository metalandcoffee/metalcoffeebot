import { tmi } from './../vendor/tmi.js';
import { seSocket } from './../vendor/se.js';
import { config } from 'dotenv';

// Load environment variables.
config();

seSocket.on('event', (data) => {
   if ( `follow` === data.type ) {
    console.log('New follower!');
    tmi.say(process.env.CHANNEL_NAME, `Welcome to the MC Lounge, ${data.data.displayName} metala19Cheers`);
   }
});
