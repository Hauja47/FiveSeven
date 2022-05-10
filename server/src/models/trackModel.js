const mongoose = require('mongoose');
const { USER, ADMIN } = require('../constants');

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: [String],
    },
    categories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Category",
        required: true,
    },
    description: {
        type: String,
    },
    uploader: {
        type: [mongoose.Schema.Types.ObjectId],
        refPath: 'uploader_type',
        required: true
    },
    uploader_type: {
        type: String,
        enum: [USER, ADMIN],
        required: true,
    },
    filepath: {
        type: String,
    },
    is_public: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    }
}, {
    timestamps: true,
    collation: {
        locale: 'vi',
        numericOrdering: true,
        normalization: true
    }
});

module.exports = mongoose.model("User", trackSchema);
