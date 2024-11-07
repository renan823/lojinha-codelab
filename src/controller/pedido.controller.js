const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    //buscar pedidos aqui

    res.json({ pedidos: [] }).status(200);
    return;
});

router.post('/novo', (req, res) => {
    const { produtoId, quantidade } = req.body;

    if(!produtoId || !quantidade){
        res.status(400).json({ mensagem : "Dados incompletos do pedido "});
        return;
    }

    //buscar produto no banco
    const produto = null;

    if(!produto){
        return res.status(404).json({ mensagem : 'Produto não encontrtado' });
    }

    if(produto.estoque < quantidade){
        res.status(400).json( { mensagem : "Estoque insufiente do produto "});
        return;
    }

    //retirar quantidade do estoque e salvar

    //criar novo pedido

    res.status(201).json({ mensagem : "Pedido criado com sucesso", pedido : novoPedido});
    return;
});

module.exports = router;