var kafka = require('kafka-node'),
    io = require('socket.io-emitter')({ host: 'localhost', port: 6379 }),
    HighLevelConsumer = kafka.HighLevelConsumer,
    Client = kafka.Client;

    var hrTime = process.hrtime();
    kafkaGroup = 'twitter_' + (hrTime[0] * 1000000 + hrTime[1] / 1000);
    client = new Client(process.env.ZOOKEEPER_URL, kafkaGroup);

    var consumer = new HighLevelConsumer(
        client,
        [
            {topic: 'tweets'}
        ],
        {
            groupId: kafkaGroup
        }
    );

consumer.on('message', function(message) {
    var msg = {};
    try {
        msg = JSON.parse(message.value);
    } catch (e) {}
    io.emit('tweet', msg);
});