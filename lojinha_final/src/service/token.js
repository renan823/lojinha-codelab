const jwt = require("jsonwebtoken");

//essa chave NUNCA DEVE ESTAR NO CÓDIGO
//use arquivos .env ou gaurde-as em um local seguro!!!
const SECRET_KEY = "codelab_eh_o_melhor_grupo";

exports.generate = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

//isso aqui pode causar um erro (quando token estiver errado)
//trate o erro na chamada da função
exports.verify = (token) => {
    return jwt.verify(token, SECRET_KEY);
}