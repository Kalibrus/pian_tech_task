const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

MongoClient.connect("mongodb://admin:1Lbvfhekbn@ds052978.mlab.com:52978/users_db", (err, database) => {
    if (err) {
        return console.log(err);
    }

    require('./routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});