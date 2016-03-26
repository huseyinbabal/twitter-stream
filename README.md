## Real-time Notification with NodeJS, SocketIO, Apache Kafka with Twitter streaming.

# Howto

- Set following environment variables,
    - ZOOKEEPER_URL
    - CONSUMER_KEY
    - CONSUMER_SECRET
    - ACCESS_TOKEN
    - ACCESS_TOKEN_SECRET
    - REDIS_HOST
    - REDIS_PORT
    - TWITTER_HASH_TAG
    
- Start twitter streaming `node twitter-stream.js`
- Start kafka consumer `node kafka-consumer.js`
- Start socket server `node server.js`