// import { google } from 'googleapis';
// import readline from 'readline';
// import dotenv from 'dotenv';
// dotenv.config();

// const oAuth2Client = new google.auth.OAuth2(
//     "138063802558-rgdfpinng4532rit299tlnrlbfsimtb3.apps.googleusercontent.com",
//     "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",
//     "http://localhost:8080/oauth2callback"

// );


// const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/calendar.events'],
// });

// console.log('Authorize this app by visiting this URL:', authUrl);

// const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
// rl.question('Enter the code from the page here: ', async (code) => {
//     const { tokens } = await oAuth2Client.getToken(code);
//     console.log('Your refresh token:', tokens.refresh_token);
//     rl.close();
// });


import { google } from 'googleapis';
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
    "159622135988-tnch4kq8mtfs8pieemagejkb7k3dif5g.apps.googleusercontent.com",
    "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",
    "https://api.groweza.com/oauth2callback"
);

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // 👈 ensures we always get a refresh_token
    scope: ['https://www.googleapis.com/auth/calendar'], // 👈 full Calendar scope (required for Meet)
});

console.log('Authorize this app by visiting this URL:', authUrl);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Enter the code from the page here: ', async (code) => {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Your refresh token:', tokens.refresh_token);
    rl.close();
});
