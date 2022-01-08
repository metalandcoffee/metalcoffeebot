import fs from 'fs';
import { tmi } from './../vendor/tmi.js';

let parsedTimers = {};

function init() {

    // Read in timers database.
    let timers = fs.readFileSync('./components/tmp/timers.json', 'utf-8');

    // Convert it from string to object.
    parsedTimers = JSON.parse(timers);

    // Initialize timer expiration dates.
    maybeUpdateExpDate();

    // Call function every minute.
    //setInterval(maybeSendTimerMessage, 600_000);
    setInterval(maybeSendTimerMessage, 60_000);

}

function maybeSendTimerMessage() {
    console.log(`hey...it's been a minute.`);
    //console.log(parsedTimers);
    maybeUpdateExpDate(true);
}

function maybeUpdateExpDate(sendTimerMsg = false) {
    // Get current time in milliseconds.
    const nowInMs = Number(new Date());

    // Look through each timer property.
    for (let prop in parsedTimers) {
        // Check to see if expiration date is in the past.
        const expDateInMs = parsedTimers[prop].expirationDate;

        // If expiration date is in the past, send to chat and update.
        if (nowInMs > expDateInMs) {
            console.log(`${prop} is expired.`);
            const nextTimestamp = nowInMs + (parsedTimers[prop].timeIntervalInMinutes * 60_000);
            parsedTimers[prop].expirationDate = nextTimestamp;

            // Say message in chat.
            if (sendTimerMsg) tmi.say(process.env.CHANNEL_NAME, parsedTimers[prop].message);
        }
    }

    // Turn object into string before updating file.
    const stringifiedTimers = JSON.stringify(parsedTimers);
    fs.writeFile('./components/tmp/timers.json', stringifiedTimers, err => {
        //console.log(parsedTimers);
        //console.log('writing to timers.json');
        if (err) return console.log(err);
    });
}

init();

// Initialize command processor on each message sent in chat.
//tmi.on(`message`, messageTimers);