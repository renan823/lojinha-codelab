const express = require('express');

//instancia da aplicação
const app = express();

//middleware para receber dados do cliente como json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rotas do produto
app.use("/produtos/", require("./controller/produto.controller"));

//rotas do cliente
app.use("/usuarios/", require("./controller/usuario.controller"));

//rotas do pedido
app.use("/pedidos/", require("./controller/pedido.controller"));


//incializando servidor 
//comunicação cliente e servidor é a porta
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});