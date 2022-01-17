/**
 * Connect to TAU (local instance) via WebSocket.
 * 
 * @link https://github.com/Team-TAU/tau
 */
import WebSocket from 'ws';
import follow from '../components/follow.js';
import raid from '../components/raid.js';

export default function connectTAU() {
    const webSocketUrl = 'ws://localhost:8000/ws/twitch-events/'; // This address is your local TAU instance address.  By default it is localhost:8000.  NOTE: the protocol must be ws:// NOT http://
    const webSocketToken = process.env.TAU_AUTH_TOKEN; // This token is found by going to your TAU dashboard in a browser, clicking on "User" in the left nav pane then clicking "View Token"

    let webSocket = new WebSocket(webSocketUrl);

    // onopen event - change connection status in json card's header.
    webSocket.onopen = (e) => {
        console.log(`Connected to websocket ${webSocketUrl}`);
        webSocket.send(JSON.stringify({ token: webSocketToken }));
    }

    // onmessage event - update the view of the data, and raw json data.
    webSocket.onmessage = (e) => {
        const data = JSON.parse(e.data);

        console.log(data);
        // Here is where we do stuff with the data that comes back.  I'd recommend a switch or if-else if-else if.. etc.. to pass the data to different functions.
        // e.g.:
        switch (data.event_type) {
            case "channel-follow":
                console.log("Someone followed my channel!");
                follow(data.event_data.user_name);
                break;
            case "channel-raid":
                console.log("Someone just raided my channel.");
                raid(data.event_data.user_name, data.event_data.from_broadcaster_user_name, data.event_data.from_broadcaster_user_id);
                break;
        }
        // the structure of data can be seen by dropping down incoming events in the dashboard.
    }

    // onclose event
    webSocket.onclose = (e) => {
        webSocket = null;
        if (!e.wasClean) {
            // If the server didn't intend to close the connection, try reconnecting
            // after 5 seconds.
            setTimeout(this.connectTAU, 5000);
        } else {
            // Otherwise update the json-status with disconnected status.
            // do something when the websocket is taken down intentionally.
        }
    }
}
