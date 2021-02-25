import 'reflect-metadata' ;
import './database';    // Faz a conexão com o banco de dados sempre que a aplicação é iniciada;
import express from 'express';
import createConnection from "./database";
import { router } from './routes';

createConnection();

const app = express();

app.use(express.json());    // Informa o express que o formato que será trabalhado. 
app.use(router);

export { app };
