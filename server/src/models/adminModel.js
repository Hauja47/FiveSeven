const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collation: {
        locale: 'vi',
        numericOrdering: true,
        normalization: true
    }
});

module.exports = mongoose.model("Admin", adminSchema);
