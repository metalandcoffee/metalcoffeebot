import fs from 'fs';
import {tmi} from './../vendor/tmi.js';

let parsedTimers = {};
let messageCount = 0;

// Check if current message was sent my metalcoffeebot
// If yes, zero out message count.
// if no, increase message count by 1.
const trackMsgCount = (channel, tags, message, self) => {
  if (self) {
    messageCount = 0;
  } else {
    messageCount++;
  }
};

tmi.on(`message`, trackMsgCount);

/**
 * Initialize heartbeat to check for timed messages.
 */
function init() {
  // Read in timers database.
  const timers = fs.readFileSync('./components/db/timers.json', 'utf-8');

  // Convert it from string to object.
  parsedTimers = JSON.parse(timers);

  // Initialize timer expiration dates.
  maybeUpdateExpDate();

  // Check to see if any timed message are due to be sent every 1 minute.
  setInterval(function() {
    console.log(`hey...it's been a minute.`);
    maybeUpdateExpDate(true);
  }, 60_000);
}

/**
 * Maybe update the expiration date in timers.json
 *
 * @param {*} sendTimerMsg Whether or not to send timed message.
 */
function maybeUpdateExpDate(sendTimerMsg = false) {
  // Get current time in seconds.
  const nowInSecs = Number(new Date());

  // eslint-disable-next-line -- Intentional looping of all props.
  for (const prop in parsedTimers) {
    // Check to see if expiration date is in the past.
    const expDateInSecs = parsedTimers[prop].expirationDate;

    // If expiration date is in the past, send to chat and update.
    if ('off' !== expDateInSecs && nowInSecs > expDateInSecs) {
      // Say message in chat.
      console.log(`messageCount ${messageCount}`);
      if (sendTimerMsg) {
        if (messageCount >= parseInt(parsedTimers[prop].chatLines)) {
          console.log(`${prop} is expired.`);
          const nextTimestamp = nowInSecs +
            (parsedTimers[prop].timeIntervalInMinutes * 60_000);
          parsedTimers[prop].expirationDate = nextTimestamp;
          tmi.say(process.env.CHANNEL_NAME, parsedTimers[prop].message);
        }
      } else {
        const nextTimestamp = nowInSecs +
          (parsedTimers[prop].timeIntervalInMinutes * 60_000);
        parsedTimers[prop].expirationDate = nextTimestamp;
      }
    }
  }

  // Turn object into string before updating file.
  const stringifiedTimers = JSON.stringify(parsedTimers);
  fs.writeFile('./components/db/timers.json', stringifiedTimers, (err) => {
    if (err) return console.log(err);
  });
}

init();
