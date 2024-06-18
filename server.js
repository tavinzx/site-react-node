//importador dos módulos necessários:
const express = require('express'); //Framework para construir aplicações web e APIs.
const mongoose = require('mongoose'); //Biblioteca que facilita a interação com o MongoDB.
const cors = require('cors'); //Middleware para permitir requisições de outros domínios (Cross-Origin Resource Sharing).

// Inicializa o aplicativo Express:
const app = express(); //Cria uma instância do aplicativo Express.
const port = 5000; //Define a porta na qual o servidor vai rodar (5000).

// Middleware para permitir requisições de outros domínios:
//Permite que o servidor aceite requisições de outros domínios (necessário para o frontend se comunicar com o backend).
app.use(cors());

// Middleware para permitir o parsing de JSON no corpo das requisições
//Ele Faz o parsing de requisições com corpo em JSON, permitindo que possamos acessar req.body nas requisições POST e PUT.
app.use(express.json());

//conexão com o MongoDB:
mongoose.connect('mongodb://localhost:27017/site-react-node', {
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB', error)
});

//Define o modelo de Produto
const produtoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    descricao: String,
    urlImagem: String
});

const produto = mongoose.model('Produto', produtoSchema) //Define a estrutura (produdoSchema) dos documentos da coleção de produtos.

//rota para obter todos os produtos
app.get('/api/produtos', async (req, res) => { //Define uma rota GET na URL /api/produtos.
    const produtos = await produto.find(); //Busca todos os documentos na coleção 'produtos'.
    res.json(produtos); //Envia a resposta com os produtos encontrados em formato JSON.
});

//rota para criar um novo produto
app.post('/api/produtos', async (req, res) => { //Define uma rota POST na URL /api/produtos.
    try {
        const novoProduto = new Produto(req.body); //Cria uma nova instância do modelo Produto com os dados do corpo da requisição (req.body).
        await novoProduto.save(); //Salva o novo produto no banco de dados.
        res.status(201).json(novoProduto); //Envia a resposta com o produto recém-criado em formato JSON e define o status HTTP como 201 (Created).
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto', error });
    }
});

//inicia o servidor
app.listen(port, () => { // Inicia o servidor para ouvir requisições na porta definida (port).
    console.log('Servidor rodando em http://localhost:${port}'); //Exibe uma mensagem no console indicando que o servidor está rodando e informando a URL (http://localhost:${port}).
});

