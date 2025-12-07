const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data.db");

module.exports = db;

// See the Difference


// this is practice command