import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento das imagens em um diretório local
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define o diretório onde as imagens serão salvas
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        // Define o nome do arquivo, mantendo o nome original
        cb(null, file.originalname);
    }
});

// Cria um objeto de upload do Multer
// **Observação:** A configuração `storage` é opcional para Linux e macOS
const upload = multer({ dest: "./uploads" , storage });

// Função que define as rotas da aplicação
const routes = (app) => {
    // Habilita o parsing de dados JSON no corpo das requisições
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota para listar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);

    // Rota para fazer upload de uma imagem
    // O parâmetro `upload.single("imagem")` indica que estamos
    // fazendo upload de um único arquivo com o nome "imagem"
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;