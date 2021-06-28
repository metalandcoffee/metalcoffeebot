# Metalcoffeebot
## Chatbot for twitch.tv/metalandcoffee_

This is a very basic Node.js application that can be used as a starting point to make your own chatbot for Twitch! ✨

This application uses [tmi.js](https://tmijs.com/) to interact with Twitch Chat & connects to the Twitch API and StreamElements API.

### **Getting started**
After cloning the repository, run `npm install` in the root directory to install all the needed packages defined in `package.json`.

Create an `.env` file to store your secrets. The following environmental variables should be defined in the file:

| Variable      | Description |
| ----------- | ----------- |
| BOT_USERNAME  | Username of Twitch account created for chatbot       |
| OAUTH_TOKEN   | OAuth Token for Twitch IRC interface (Use [Twitch Chat OAuth Password Generator](https://twitchapps.com/tmi/) to generate)       |
| CHANNEL_NAME   | Username of Twitch account to use chatbot for.        |
| CLIENT_ID   | Twitch Client ID (for Twitch API) Register an application [here](https://dev.twitch.tv/console) to obtain. |
| CLIENT_SECRET   | Twitch Client Secret (for Twitch API) Register an application [here](https://dev.twitch.tv/console) to obtain.        |
| SE_JWT   | Optional. If you have a Stream Elements account and want to use their API to receive new events (i.e. follows, subscribes, cheers, etc.)        |

### **Sample `.env` file**
```
# Environment Config

BOT_USERNAME=metalcoffeebot
OAUTH_TOKEN=1234567890
CHANNEL_NAME=metalandcoffee_
CLIENT_ID=1234567890
CLIENT_SECRET=1234567890
SE_JWT=1234567890
```
## Resources
If you need to quickly figure the broadcaster ID based on the username.
https://jwalter-twitch.builtwithdark.com/myuserid?name=sociablesteve