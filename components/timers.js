import fs from 'fs';
import { tmi } from './../vendor/tmi.js';

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
}

tmi.on(`message`, trackMsgCount);

function init() {

    // Read in timers database.
    let timers = fs.readFileSync('./components/tmp/timers.json', 'utf-8');

    // Convert it from string to object.
    parsedTimers = JSON.parse(timers);

    // Initialize timer expiration dates.
    maybeUpdateExpDate();

    // Call function every minute.
    //setInterval(maybeSendTimerMessage, 600_000);
    setInterval(function () {
        console.log(`hey...it's been a minute.`);
        maybeUpdateExpDate(true);
    }, 60_000);

}

function maybeUpdateExpDate(sendTimerMsg = false) {
    // Get current time in seconds.
    const nowInSecs = Number(new Date());

    // Look through each timer property.
    for (let prop in parsedTimers) {
        // Check to see if expiration date is in the past.
        const expDateInSecs = parsedTimers[prop].expirationDate;

        // Temp code.
        const tmpDate = new Date(expDateInSecs).toLocaleDateString("en-US");
        var tmpTime = new Date(expDateInSecs).toLocaleTimeString("en-US");
        console.log(tmpDate, tmpTime);
        // End temp code.

        // If expiration date is in the past, send to chat and update.
        if (nowInSecs > expDateInSecs) {
            // Say message in chat.
            console.log(`messageCount ${messageCount}`);
            if (sendTimerMsg) {
                if (messageCount >= parseInt(parsedTimers[prop].chatLines)) {
                    console.log(`${prop} is expired.`);
                    const nextTimestamp = nowInSecs + (parsedTimers[prop].timeIntervalInMinutes * 60_000);
                    parsedTimers[prop].expirationDate = nextTimestamp;
                    tmi.say(process.env.CHANNEL_NAME, parsedTimers[prop].message);
                }
            } else {
                console.log(`${prop} is expired.`);
                const nextTimestamp = nowInSecs + (parsedTimers[prop].timeIntervalInMinutes * 60_000);
                parsedTimers[prop].expirationDate = nextTimestamp;
            }
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