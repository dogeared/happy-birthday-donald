## Happy Birthday Donald!

It's President* Trump's birthday on 6/14. 

Let's all wish him well by tweeting a happy birthday message with 1 of 100,000 pictures of 
President Barack Obama attached.

## Setup

In order to use this app, you'll need [node.js](https://nodejs.org/en/download/) and a 
[Twitter developer account](https://developer.twitter.com/en/docs/basics/getting-started).

Create an [application](https://developer.twitter.com/en/apps) in your twitter developer account.

From the **Keys and tokens** tab of your app's details page, create an `Access token` and 
`Access token secret` to go along with the auto-generated `Consumer API keys`.

**NOTE**: You need to save the access token and the access token secret values as Twitter only
shows them once to you.

run `npm install` to install the required node.js libraries.

## Running

Execute the following:

API_KEY=<api key> \
API_SECRET_KEY=<api secret key> \
ACCESS_TOKEN=<access token> \
ACCESS_TOKEN_SECRET=<access token secret> \
MESSAGE='Happy Birthday!' \
TO_HANDLE=@realdonaldtrump \
INTERVAL=<interval between tweets in milliseconds. 300000 is 5 minutes> \
node hbd.js