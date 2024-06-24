import express ,{Request, Response} from 'express';
import cors from 'cors';
import { db } from './db.config';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
})

app.post('/register', async (req: Request, res: Response) => {
    const { nome, senha } = req.body;

    if(nome === undefined || senha === undefined){
        return res.status(400).send("Usuário ou senha não informados");
    }
    
    const result = await db.execute({
        sql: "SELECT * FROM usuario WHERE nome = ?",
        args: [nome]
    });

    if(result.rows.length > 0) {
        return res.status(400).send("Usuário já cadastrado");
    }

    await db.execute({
        sql: "INSERT INTO usuario (nome, senha ) VALUES (?, ?)",
        args: [nome, senha]
    });
    

    res.status(201).send("Usuário cadastrado com sucesso");
});


app.listen(3000);