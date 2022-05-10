const mongoose = require('mongoose');
const { SOLVED, PENDING } = require("../constants")

const reportSchema = new mongoose.Schema({
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Track",
        require: true
    },
    description: {
        type: String,
        required: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    state: {
        type: String,
        enum: [SOLVED, PENDING]
    },
}, {
    timestamps: true,
    collation: {
        locale: 'vi',
        numericOrdering: true,
        normalization: true
    }
});

module.exports = mongoose.model("Report", reportSchema);
