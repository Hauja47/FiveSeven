const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    collation: {
        locale: 'vi',
        numericOrdering: true,
        normalization: true
    }
});

module.exports = mongoose.model("Category", categorySchema);
