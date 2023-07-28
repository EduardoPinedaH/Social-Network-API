const mongoose = require('mongoose');

mongoose.connect('moongose://localhost:27017/socialNetworkDB', {
    userNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection;