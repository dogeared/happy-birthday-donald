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

const interval = Number(process.env.INTERVAL);

// read images file
const images = fs.readFileSync('obamapics.txt').toString().split("\n");
 
const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const toHandle = process.env.TO_HANDLE;
const message = process.env.MESSAGE;

const tmpFilePath = '/tmp/img.jpg';

const hbd = () => {
    let url = images[between(0, images.length)];
    console.log('Downloading image...');
    download(url, tmpFilePath, () => {
        var data = require('fs').readFileSync(tmpFilePath);
        console.log('Uploading image to twitter...');
        client.post('media/upload', { media: data }, function (error, media, response) {
    
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
        });
    })
};

console.log('Kicking off Happy Birthday Donald.');
console.log('About to send tweet. Next will be in ' + interval + ' milliseconds.');
console.log();
hbd();

setInterval(hbd, interval);