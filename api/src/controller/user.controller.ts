import { Request, Response } from "express"
import { db } from "../db.config"

interface Result {
    ok: boolean,
    message: string,
    status: number,
    id: number
}


export async function Register(nome: string, senha: string): Promise<Result>  {
    // const { nome, senha } = req.body;

    if(nome === undefined || senha === undefined){
        // return res.status(400).send("Usuário ou senha não informados");
        return {
            ok: false,
            message: "Usuário ou senha não informados",
            id: 0,
            status: 400
        }
    }
    
    const result = await db.execute({
        sql: "SELECT * FROM usuario WHERE nome = ?",
        args: [nome]
    });

    if(result.rows.length > 0) {
        // return res.status(400).send("Usuário já cadastrado");
        return {
            ok: false,
            message: "O usuário já existe!",
            id: 0,
            status: 400
        }
    }

    const insert = await db.execute({
        sql: "INSERT INTO usuario (nome, senha ) VALUES (?, ?)",
        args: [nome, senha]
    });
    ''

    // res.status(201).send("Usuário cadastrado com sucesso");

    return{
        ok:true,
        message:"Usuário cadastrado com sucesso!",
        id: Number(insert.lastInsertRowid!),
        status: 201
    }
}

export async function Login(nome:string, senha:string): Promise<Result> {

    if(nome === undefined || senha === undefined){
        // return res.status(400).send("Usuário ou senha não informados!");

        return{
            ok: false,
            message:"Usuário ou senha não informados!",
            id: 0,
            status:400
        }
    }

    const result = await db.execute({
        sql: "SELECT * FROM usuario WHERE nome = ?",
        args: [nome]
    });    

    if(result.rows.length === 0) {
        // return res.status(404).send("Usuário não encontrado!");

        return{
            ok: false,
            message:"Usuário não encontrado!",
            id:0,
            status: 400
        }
    }


    if(result.rows[0].senha !== senha){
        // return res.status(404).send("Senha incorreta!");

        return{
            ok: false,
            message:"Senha incorreta!",
            id:0,
            status: 400
        }
    }


    // res.status(200).send("Usuário logado com sucesso!");

    return{
        ok:true,
        message:"Usuário logado com sucesso!",
        id: Number(result.rows[0].id),
        status: 200
    }
}

export async function Delete(id:number, senha:string): Promise<Result> {

    const result = await db.execute({
        sql: "SELECT * FROM usuario WHERE id = ?",
        args: [id]
    });  

    if(result.rows[0].senha !== senha){
        // return res.status(404).send("Senha incorreta!");

        return{
            ok: false,
            message:"Senha incorreta!",
            id: 0,
            status: 400
        }
    }

    db.execute({
        sql: "DELETE FROM usuario WHERE id = ?",
        args: [id]
    });

    // res.status(200).send("Usuário deletado com sucesso!");

    return{
        ok:true,
        message:"Usuário deletado com sucesso!",
        id: Number(result.rows[0].id),
        status: 200
    }

}

function Update() {}