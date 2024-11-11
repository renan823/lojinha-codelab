const { PrismaClient } = require('@prisma/client');
const express = require('express');
const hash = require("../service/hash");
const tokens = require("../service/token");

const authenticate = require("../middleware/auth.middleware");

const router = express.Router();
const prisma = new PrismaClient();

router.get('', authenticate, async (req, res) => {
    //buscar usuarios aqui
    const usuarios = await prisma.usuario.findMany();
    usuarios.forEach(usuario => delete usuario.senha)

    res.json({ usuarios }).status(200);
    return;
});

router.post('/novo', async (req, res) => {
    const { nome, senha, email, telefone, cpf } = req.body;

    if(!nome || !senha || !email || !telefone || !cpf){
        res.status(400).json({ mensagem : "Dados incompletos do cliente"});
        return;
    }

    //adicionar cliente no banco de dados
    const existeUsuario = await prisma.usuario.findUnique({ where: { email }});
    if (existeUsuario != null) {
        res.status(400).json({ mensagem : "Este email já está cadastrado" });
        return;
    }
        
    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            telefone,
            cpf,
            senha: hash.generate(senha)
        }
    })

    delete usuario.senha; //remove a senha da resposta

    res.status(201).json({ mensagem : "Cliente criado com sucesso", usuario });
    return;
});

router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    if(!senha || !email){
        res.status(400).json({ mensagem : "Dados incompletos para login"});
        return;
    }

    const usuario = await prisma.usuario.findUnique({ where: { email }});
    if (!usuario) {
        res.status(400).json({ mensagem : "Usuário/senha incorretos"});
        return;
    }

    if (!hash.compare(senha, usuario.senha)) {
        res.status(400).json({ mensagem : "Usuário/senha incorretos"});
        return;
    }

    const token = tokens.generate({ email });

    res.status(200).json({ token });
    return;
})

module.exports = router;