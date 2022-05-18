const mongoose = require('mongoose');
const hashPassword = require('../helpers/hashPassword');

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

adminSchema.pre('save', hashPassword);

module.exports = mongoose.model("Admin", adminSchema);
