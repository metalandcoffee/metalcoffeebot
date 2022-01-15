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
        logColorMsg(error);
    }
};

/**
 * @param {string} broadcaster_id 
 * @returns object/string
 * @link https://dev.twitch.tv/docs/api/reference#get-channel-information
 */
export const getTwitchChannelInfo = async (broadcaster_id) => {
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

/**
 * Get uesr info by username. If none found { data: [] }.
 * 
 * @param {string} username Twitch username
 * @returns object/string
 * @link https://dev.twitch.tv/docs/api/reference#get-users
 */
export const getUserInfo = async (username) => {
    const tokenResponse = await getAccessToken();
    const fetchOptions = {
        headers: {
            "Client-Id": process.env.CLIENT_ID,
            Authorization: `Bearer ${tokenResponse.access_token}`,
        },
    };
    if (tokenResponse.access_token) {
        const usersResponse = await fetch(
            `https://api.twitch.tv/helix/users?login=${username.toLowerCase()}`,
            fetchOptions,
        );
        const user = await usersResponse.json();
        return user;
    }

    return 'Failed to get access token';
};


//{
//     data: [
//       {
//         id: '163734028',
//         login: 'metalandcoffee_',
//         display_name: 'MetalAndCoffee_',
//         type: '',
//         broadcaster_type: 'affiliate',
//         description: "💀☕️ Hey! I'm Metal & Coffee (she/her). I'm a ful-time web developer. I'm a metalhead ᕙ(⇀‸↼‶)ᕗ I stream coding and horror games. ☕️💀🤘🏾",
//         profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/77260c3b-0087-4297-b2f1-83d92567d552-profile_image-300x300.png',
//         offline_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f30cdb32-c095-4453-ab3a-770d7a3aa16d-channel_offline_image-1920x1080.png',
//         view_count: 13620,
//         created_at: '2017-07-09T17:28:23Z'
//       }
//     ]
//   }