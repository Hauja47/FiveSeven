const bcrypt = require('bcryptjs');

async function hashPassword(next) {
    if (!this.isModified('password')) {
        next();
    }

    let salt = await bcrypt.getSalt(5);
    this.pass = await bcrypt.hash(this.password, salt);
}

module.exports = hashPassword;
