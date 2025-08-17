import { google } from 'googleapis';
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
    "138063802558-rgdfpinng4532rit299tlnrlbfsimtb3.apps.googleusercontent.com",
    "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",
    "http://localhost:8080"
);


const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
});

console.log('Authorize this app by visiting this URL:', authUrl);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Enter the code from the page here: ', async (code) => {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Your refresh token:', tokens.refresh_token);
    rl.close();
});
