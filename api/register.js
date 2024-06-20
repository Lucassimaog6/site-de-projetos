import { createClient } from "@libsql/client";

export const turso = createClient({
    url: "libsql://site-projetos-carlosg2011.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTg4ODk2OTcsImlkIjoiY2FlYTVjNzktZTQxOC00Yjc1LWE2YmItNWEzY2Q5YTE1MDQ2In0.zat1Oah5cRC2JmSBF58sloQ9L7lSaWOJyPxczGQRLPod7_q97ewhYBOIzsVEhr0SrtcticULsFmwlaCVUPfwAw"
  });

const express = require("express")
const cors = require("cors")

const app  = express()
app.use(express.json())

app.use(cors())

app.post("/registro", async(req,res) => {

    const nome = req.body.nome
    const usuario = req.body.usuario
    const senha = req.body.senha
    const descricao = req.body.descricao

    const result = await turso.execute({
        sql: "INSERT INTO usuario (nome, usuario, senha, descricao )VALUES (?, ?, ?, ?)", 
        args: [nome, usuario, senha, descricao]
    });

    usuario = result.rows[0]
    if(usuario["usuario"] === usuario){
        return res.status(400).json({ erro: "Usuario ja cadastrado"})
    }

    return res.status(201).json({ message: `Usuário ${nome} cadastrado com sucesso` })
})

app.listen(3000)