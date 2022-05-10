const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tracks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Track'
    },
    is_public: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collation: {
        locale: 'vi',
        numericOrdering: true,
        normalization: true
    }
});

module.exports = mongoose.model("Playlist", playlistSchema);
