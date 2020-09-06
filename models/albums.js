const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema( {
    albumName: {
        type: String,
        require: true

    },
    artistNames: {
        type: String,
        require: true

    },
    releaseDate: {
        type: String,
        require: true


    }
})

module.exports = mongoose.model('albums', albumSchema );