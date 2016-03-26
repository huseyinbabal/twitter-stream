var kafka = require('kafka-node'),
    io = require('socket.io-emitter')({ host: 'localhost', port: 6379 }),
    HighLevelConsumer = kafka.HighLevelConsumer,
    Client = kafka.Client;

    kafkaGroup = 'twitter';
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