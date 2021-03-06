const mongoose = require('mongoose');
const Schema = mongoose.Schema

const guestsSchema = mongoose.Schema({
    writer : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title : {
        type: String,
        maxlength: 50
    },
    description : {
        type: String
    },
    gender : {
        type: String
    },
    birthday : {
        type: Date
    },
    age : {
        type: Number,
        default: 0
    },
    images : {
        type: Array,
        default : []
    },
    mbtis: {
        type: Number,
        default: 1
    },
    sold : {
        type :Number,
        maxlength : 100,
        default: 0
    },
    views: {
        type: Number,
        default : 0
    }
}, { timestamps : true})

guestsSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
})

const Guests = mongoose.model('Guests', guestsSchema);

module.exports = { Guests }