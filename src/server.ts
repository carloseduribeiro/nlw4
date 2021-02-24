import 'reflect-metadata' ;
import './database';    // Faz a conexão com o banco de dados sempre que a aplicação é iniciada;
import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());    // Informa o express que o formato que será trabalhado. 
app.use(router);

app.listen(3333, () => console.log("Server is running!"));
