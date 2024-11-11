const bcrypt = require("bcrypt");

exports.generate = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

exports.compare = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}