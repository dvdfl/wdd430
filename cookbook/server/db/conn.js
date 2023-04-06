const { MongoClient } = require("mongodb");
require('dotenv').config();

let _client;

const getDb = function () {
    // if connection has been initialized return it
    if(_client) return _client;

    //console.log("openning connection...")
    _client = new MongoClient(process.env.MONGO_URI);
    _client.connect();
    return _client;
}

module.exports = { getDb };