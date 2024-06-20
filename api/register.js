const express = require("express")
const cors = require("cors")
const turso = createClient({
    url: "libsql://games-carlosg2011.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTg3NTIxMzQsImlkIjoiMjQxZWM3ZDQtMjhjZS00NGJlLTljNGItOThkYTQ4NWY2YTU2In0.y5UPRDzL0d6ZJf0F0cg2jB5w_sTL02WTiDoXuQ0ZFts3yKEvq0PnY85d7zP0ogAT3VoyuZ5VlwdKaKQr4h_lBg"
  });

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