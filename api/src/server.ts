import express ,{Request, Response, json} from 'express';
import cors from 'cors';
import { db } from './db.config';
import { Register, Login, Delete } from './controller/user.controller';



const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
})

app.post('/register', async (req: Request, res: Response) => {
    const { nome, senha } = req.body;

    const result = await Register(nome, senha)

    res.status(result.status).json(result)
});


app.post('/login', async (req: Request, res: Response) => {

    const { nome, senha } = req.body;

    const result = await Login(nome, senha)

    res.status(result.status).json(result)
});


app.post('/delete', async (req: Request, res: Response) => {

    const {id, senha} = req.body;

    const result = await Delete(id, senha)

    res.status(result.status).json(result)
});


app.listen(3000);