const { mongo_uri } = require('../../config.json');
const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect(mongo_uri);

        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectToDB;