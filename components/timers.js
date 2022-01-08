import fs from 'fs';

function init() {
    let timers = fs.readFileSync('./components/tmp/timers.json', 'utf-8');
    let parsedTimers = JSON.parse(timers);
    const nowInMs = Number(new Date());
    for (let prop in parsedTimers) {
        // Check to see if expiration date is in the past.
        const expDateInMs = parsedTimers[prop].expirationDate;
        if (nowInMs > expDateInMs) {
            const nextTimestamp = nowInMs + (parsedTimers[prop].timeIntervalInMinutes * 1000 * 60 );
            parsedTimers[prop].expirationDate = nextTimestamp
        }
    }
    
    const stringifiedTimers = JSON.stringify(parsedTimers)
    fs.writeFile('./components/tmp/timers.json', stringifiedTimers, err =>{ 
        console.log(parsedTimers);
        console.log('writing to timers.json');
        if (err) return console.log(err);
    }) 
}

init();

// Initialize command processor on each message sent in chat.
//tmi.on(`message`, messageTimers);