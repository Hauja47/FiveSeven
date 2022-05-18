const mongoose = require('mongoose');

const blockedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    by_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    unblocked_at: {
        type: Date
    }
}, {
    timestamps: true,
    collation: {
        locale: 'vi',
        numericOrdering: true,
        normalization: true
    }
});

module.exports = mongoose.model("Blocked", blockedSchema);
