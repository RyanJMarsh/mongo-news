const mongoose = require('mongoose');
const Article = require('../models/app.models');
const { articleData } = require('./initial-data');
require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION).then(console.log("Connected to DB"))

const seedDB = async () => {
    await Article.deleteMany({});
    await Article.insertMany(articleData)
}

seedDB().then(() => {
    console.log("DB Seeded")
    mongoose.connection.close().then(console.log("Closed Connection to DB"))
})

