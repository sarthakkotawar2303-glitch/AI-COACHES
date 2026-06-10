const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required"],
        trim: true
    }
}, {
    timestamps: true
})

const Blacklist = new mongoose.model('Blacklist', blacklistSchema);

module.exports = Blacklist;