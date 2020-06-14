const fs = require('fs');
const request = require('request');
const Twitter = require('twitter');

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback);
    });
};

// random from min to max, exclusive
const between = (min, max) => {  
    return Math.floor(
        Math.random() * (max - min) + min
    )
};
 
const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// read images file
const images = fs.readFileSync('obamapics.txt').toString().split("\n");

const interval = Number(process.env.INTERVAL);
const toHandle = process.env.TO_HANDLE;
const message = process.env.MESSAGE;
const tmpFilePath = process.env.TMP_PATH;

let usedIndices = [];

const hbd = () => {
    var idx;
    do {
        idx = between(0, images.length);
    } while (usedIndices.includes(idx));
    usedIndices.push(idx);
    let url = images[idx];
    console.log('Downloading image...');
    download(url, tmpFilePath, () => {
        var data = require('fs').readFileSync(tmpFilePath);
        console.log('Uploading image to twitter...');
        client.post('media/upload', { media: data }, function (error, media, response) {
            try {
                if (error) throw error;
                var status = {
                    status: message + ' ' + toHandle,
                    media_ids: media.media_id_string
                };
                console.log('Posting status to twitter...')
                client.post('statuses/update', status,  function(error, tweet, response) {
                    if (error) throw error;
                    // console.log(tweet);  // Tweet body.
                    // console.log(response);  // Raw response object.
                    console.log();
                });
            } catch (e) {
                console.log(e);
            }
        });
    })
};

console.log('Kicking off Happy Birthday Donald.');
console.log('About to send tweet. Next will be in ' + interval + ' milliseconds.');
console.log();
hbd();

setInterval(hbd, interval);