const mongoose = require('mongoose');
const hashPassword = require('../helpers/hashPassword');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    is_blocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collation: {
        locale: 'vi',
        numericOrdering: true,
        normalization: true
    }
});

userSchema.pre('save', hashPassword);

module.exports = mongoose.model("User", userSchema);
