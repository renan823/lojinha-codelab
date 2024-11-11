const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    //buscar clientes aqui

    res.json({ clientes: [] }).status(200);
    return;
});

router.post('/novo', (req, res) => {
    const { nome, senha, email, telefone, cpf } = req.body;

    if(!nome || !senha || !email || !telefone || !cpf){
        res.status(400).json({ mensagem : "Dados incompletos do cliente"});
        return;
    }

    //adicionar cliente no banco de dados

    res.status(201).json({ mensagem : "Cliente criado com sucesso" });
    return;
});

module.exports = router;