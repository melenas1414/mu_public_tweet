require('dotenv').config();
const Twitter = require('twitter');
const client = new Twitter({
    consumer_key: process.env.apikey,
    consumer_secret: process.env.apikeySecret,
    access_token_key: process.env.accessToken,
    access_token_secret: process.env.accessTokenSecret,
});
const clientPublic =  new Twitter({
    consumer_key: process.env.apikey,
    consumer_secret: process.env.apikeySecret,
    access_token_key: process.env.accessToken,
    access_token_secret: process.env.accessTokenSecret,
    bearer_token: process.env.bearer
});



/*async function getAccount() {

    let Account = await client.get('users/show', {screen_name: "melenas1414"});

    console.log(Account);

    return Account;
}


getAccount();*/

var stream = client.stream('statuses/filter', {follow: 17676713});
    
stream.on('data', async function(event) {
    try {
        console.log(event);
        publicTweet(event.id);

    } catch(error) {
        console.error(error);
    }
});

stream.on('error', function(error) {
    console.log(error)
     throw error;
   });

async function publicTweet(id) {
    try {
        let response =  await clientPublic.post('statuses/update', {status: "Hola Mundo", in_reply_to_status_id: id});
        console.log(response);
    } catch(error) {
        console.log(error);
    }
}



