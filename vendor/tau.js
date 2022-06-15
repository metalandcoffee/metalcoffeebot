/**
 * Connect to TAU (local instance) via WebSocket.
 *
 * @link https://github.com/Team-TAU/tau
 */
import WebSocket from 'ws';
import follow from '../components/follow.js';
import raid from '../components/raid.js';
import {subGiftNotif, subNotif} from '../components/subs.js';

/**
 * Connect to TAU.
 */
export default function connectTAU() {
  const webSocketUrl = 'ws://localhost:8000/ws/twitch-events/'; // This address is your local TAU instance address.  By default it is localhost:8000.  NOTE: the protocol must be ws:// NOT http://
  const webSocketToken = process.env.TAU_AUTH_TOKEN; // Token in TAU dashboard.
  let webSocket = new WebSocket(webSocketUrl);

  // onopen event - change connection status in json card's header.
  webSocket.onopen = (e) => {
    console.log(`Connected to websocket ${webSocketUrl}`);
    webSocket.send(JSON.stringify({token: webSocketToken}));
  };

  // onmessage event - update the view of the data, and raw json data.
  webSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    switch (data.event_type) {
      case 'channel-follow':
        console.log('Someone followed my channel!');
        follow(data.event_data.user_name);
        break;
      case 'channel-raid':
        console.log('Someone just raided my channel.');
        const userName = data.event_data.from_broadcaster_user_login;
        const displayName = data.event_data.from_broadcaster_user_name;
        const userID = data.event_data.from_broadcaster_user_id;
        raid(userName, displayName, userID);
        break;
      case 'channel-subscribe':
        subNotif(data.event_data.user_name, data.event_data.is_gift);
        break;
      case 'channel-subscription-gift':
        subGiftNotif(data.event_data.user_name, data.event_data.total);
        break;
    }
  };

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
  };
}
