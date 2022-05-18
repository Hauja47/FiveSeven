const jwt = require('jwt');

const auth = (req, res, next) => {
    try {
        console.log(req.headers);

        next();
    } catch (err) {
        console.error(err);
    }
}
