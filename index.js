const express = repquire('express');
const app = express();

app.use(express.static(_dirname + '/views')); // html
app.use(express.static(_dirname + '/public')); // js, css, images

const server = app.listen(5000);

const apiai = require('apiai')(388b84afe82ecc019b16993f6dbf5da56a40eb75);

// Web UI
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

io.on('connecion', function(socket) {
    socket.on('chat message', (text) => {

        // Get a reply from API.AI

        let apiaiReq = apiai.textRequest(text, {
            sessionId: 108256383690629989703
        });

        apiaiReq.on('response', (response) => {
            let aiText = response.result.fullfillment.speech;
            socket.emit('bot reply', aiText); // Send the result back to the browser
        });

        apiaiReq.on('error', (error) => {
            console.log(error);
        });

        apiaiReq.end();
    });
});