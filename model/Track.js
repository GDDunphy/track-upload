const mongoose = require('mongoose')
const { Schema, model } = mongoose

const TrackSchema = new Schema({
        title: {type: String, required: true},
        version: String,
        artist: String,
        isrc: {type: String, required: true},
        pLine: String,
        aliases: Array,
        contractId: String
    }
)
const Track = model('Track', TrackSchema)
module.exports = Track