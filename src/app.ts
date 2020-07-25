import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port);

server.timeout = 1000 * 60 * 10; // 10 minutes

// Use middleware to set the default Content-Type
// tslint:disable-next-line:only-arrow-functions
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/api/endpoint1', (req, res) => {
    res.send(JSON.stringify({value: 1}));
})

app.get('/api/endpoint2', (req, res) => {
    // Set Content-Type differently for this particular API
    res.set({'Content-Type': 'application/xml'});
    res.send(`<note>
        <to>Tove</to>
        <from>Jani</from>
        <heading>Reminder</heading>
        <body>Don't forget me this weekend!</body>
        </note>`);
})

app.set('json spaces', 40);
app.get("/", (req, res) => {
    res.json({ "foo": "bar" });
});
