const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

async function main() {
  return mongoose.connect(MONGO_URI);
}

module.exports = main;