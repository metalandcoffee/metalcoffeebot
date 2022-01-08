import fs from 'fs';

function init() {
    let timers = fs.readFileSync('./components/timers.json', 'utf-8');
    const now = new Date();
    for (let prop in timers) {
        // Check to see if expiration date is in the past.
        const expDate = timers[prop].expirationDate;
        if (now > expDate) {
            let timerExp = new Date(now);
            timerExp.setMinutes(now.getMinutes() + timers[prop].timeIntervalInMinutes);
        }
    }

    fs.writeFile('./components/tmp/timers.json', timers, function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(timers));
        console.log('writing to timers.json');
    })
}

init();

// Initialize command processor on each message sent in chat.
//tmi.on(`message`, messageTimers);