import { config } from "dotenv";
import fetch from 'node-fetch';

config();

console.log(process.env.CLIENT_ID);
const accessTokenFetchUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials&scope=user_read`;

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

const test = async () => {
    const tokenResponse = await getAccessToken();
    if (tokenResponse.access_token) {
        const fetchOptions = {
            headers: {
                "Client-Id": process.env.CLIENT_ID,
                Authorization: `Bearer ${tokenResponse.access_token}`,
            },
        };

        const streamsResponse = await fetch(
            `https://api.twitch.tv/helix/channels?broadcaster_id=469006291`,
            fetchOptions,
        );
        const stream = await streamsResponse.json();
        console.log(stream);
    }
};

test();
