import 'dotenv/config';
import conectarAoBanco from "../config/dbcofig.js";
import { ObjectId } from "mongodb";
// Conecta ao banco de dados MongoDB usando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts de uma coleção específica
export async function getTodosPosts() {
    // Obtém o banco de dados 'eduardo' da conexão estabelecida
    const db = conexao.db("eduardo");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("eduardo");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("eduardo");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}