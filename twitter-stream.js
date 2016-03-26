var Twit = require('twit'),
    kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer,
    Client = kafka.Client,
    client = new Client(process.env.ZOOKEEPER_URL),
    producer = new HighLevelProducer(client);

var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:           600*1000
});

producer.on('error', function (err) {
    console.error('Error occurred while preparing producer: ', err);
});

producer.on('ready', function() {
    console.log('Kafka Producer is ready');

    var stream = T.stream('statuses/filter', { track: process.env.TWITTER_HASH_TAG });
    stream.on('tweet', function (tweet) {
        var payloads = [
            {
                topic: 'tweets', messages: JSON.stringify(tweet)
            }
        ];
        producer.send(payloads, function(err, data) {
            if (err) console.error('Error occurred while sending message to Kafka: ', err);
        });
    });
});
