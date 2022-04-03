const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://upy4l1vlpzz9lxxpdrzj:VOuz54G5J6RDz4N2pzzi@bbfozgalkrjqrfl-mongodb.services.clever-cloud.com:27017/bbfozgalkrjqrfl');
    mongoose.connection.on('open', () => {
        console.log('mongodb connected')
    });
    mongoose.connection.on('error', (err) => {
        console.log('mongodb error', err)
    });
}