var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));
var fs = require('fs');
var port = process.env.PORT || 3000;

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}


app.listen(port, function(err) {
    if (err) console.error(err);
    else console.log('App is running on port: ', port);
});