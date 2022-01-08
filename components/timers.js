import fs from 'fs';

function init() {
    let timers = fs.readFileSync('./components/tmp/timers.json', 'utf-8');
    let parsedTimers = JSON.parse(timers);
    const now = new Date();
    for (let prop in parsedTimers) {
        // Check to see if expiration date is in the past.
        const expDate = parsedTimers[prop].expirationDate;
        console.log(prop);
        if (now > expDate) {
            let timerExp = new Date(now);
            timerExp.setMinutes(now.getMinutes() + parsedTimers[prop].timeIntervalInMinutes);
        }
    }
    console.log(parsedTimers);
    let stringifiedTimers = JSON.stringify(parsedTimers)
    fs.writeFile('./components/tmp/timers.json', timers, err =>{ 
        if (err) return console.log(err);
    }) // , function writeJSON(err) {
        // if (err) return console.log(err);
        // console.log(JSON.stringify(timers));
        // console.log('writing to timers.json');
}

init();

// Initialize command processor on each message sent in chat.
//tmi.on(`message`, messageTimers);