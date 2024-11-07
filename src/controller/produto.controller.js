const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();

router.get('', async (req, res) => {
    //buscar produtos aqui
    const produtos = await prisma.produto.findMany()

    res.json({ produtos }).status(200);
    return;
});

router.post('/novo', async (req, res) => {
    const { nome, preco, estoque } = req.body;

    if(!nome || preco === undefined || estoque === undefined){
        res.status(400).json({ mensagem : "Dados incompletos" });
        return;
    }

    const produto = await prisma.produto.create({ data: { nome, quantidade: parseInt(estoque), preco: parseFloat(preco) } })

    //criar produto aqui
    res.status(201).json({ mensagem: "Produto criado", produto });
    return
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    //buscar produto por id
    
    res.json({ produto: null }).status(200);
    return;
})

module.exports = router;