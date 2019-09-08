const express = require('express');
const redis = require('redis');
 
// create express application instance
const app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
 
// create and connect redis client to local instance.
const host = '175.144.229.24';
const port = 6379;
const client = redis.createClient(port, host)
client.auth('mnxfordc');
 
// echo redis errors to the console
client.on('connect', function() {
    console.log('connected');
});
client.on('error', (err) => {
    console.log("Error " + err)
});
 
// get item list
app.get('/get', (request, response) => {
    client.get(request.query.key, function (err, reply) {
        console.log(reply.toString()); // Will print value
    });
});

// set item
app.post('/set', (request, response) => {
    var item = {
		item_key: request.body.item_key,
		item_value: request.body.item_value
    };
    
    client.set(item.item_key.toString(), item.item_value.toString(), function(err, reply) {
        console.log(reply);
    });
});
 
// start express server at 3000 port
app.listen(3000, () => {
    console.log('Server listening on port: ', 3000)
});