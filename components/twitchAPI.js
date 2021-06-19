/**
 * Connect to Twitch API.
 * 
 * @link https://dev.twitch.tv/docs/api/reference
 */


import { config } from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables.
config();

const accessTokenFetchUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials&scope=user_read`;

// OAuth - Get Access Token.
const getAccessToken = async () => {
    try {
        const response = await fetch(accessTokenFetchUrl, {
        method: "POST",
        headers: { accept: "application/vnd.twitchtv.v5+json" },
        });

        return response.json();
    } catch (error) {
        console.log(error);
    }
};

/**
 * @param {string} broadcaster_id 
 * @returns object/string
 * @link https://dev.twitch.tv/docs/api/reference#get-channel-information
 */
const getTwitchChannelInfo = async ( broadcaster_id ) => {
    const tokenResponse = await getAccessToken();
    const fetchOptions = {
        headers: {
            "Client-Id": process.env.CLIENT_ID,
            Authorization: `Bearer ${tokenResponse.access_token}`,
        },
    };
    if (tokenResponse.access_token) {
        const streamsResponse = await fetch(
            `https://api.twitch.tv/helix/channels?broadcaster_id=${broadcaster_id}`,
            fetchOptions,
        );
        const stream = await streamsResponse.json();
        return stream;
    }

    return 'Failed to get access token';
};
export default getTwitchChannelInfo;

