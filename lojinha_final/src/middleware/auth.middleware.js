const tokens = require("../service/token")

function authenticate(req, res, next) {
    const auth = req.headers.authorization;

    if (!auth) {
        res.status(403).json({mensagem: "sem autorização"})
        return;
    }

    const token = auth.split(' ')[1];
    if (!token) {
        res.status(403).json({mensagem: "sem autorização"})
        return;
    }

    try {
        tokens.verify(token)
        next()
    } catch(err){
        res.status(403).json({mensagem: "sem autorização"})
        return;
    }
}

module.exports = authenticate;