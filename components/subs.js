import { tmi } from '../vendor/tmi.js';
import { config } from 'dotenv';
import { logColorMsg } from '../helpers.js';

// Load environment variables.
config();

export function subGiftNotif(username, numOfGifts) {
   logColorMsg(`New gifted sub ${username}`);
   tmi.say(process.env.CHANNEL_NAME, `Thanks for gifting ${1 === numOfGifts ? `a sub` : numOfGifts + ` subs`}, @${username} metala19Headbang You're a lovely human being and thanks for being here.`);
}

export function subNotif(username, isGift) {
   logColorMsg(`New sub ${username}`);
   console.log(isGift)
   let text = `Thanks so much for subscribing, @${username} metala19Headbang`;
   if (isGift) {
      text = `Enjoy your gifted sub, @${username}. metala19Headbang`
   }
   tmi.say(process.env.CHANNEL_NAME, text);
}
