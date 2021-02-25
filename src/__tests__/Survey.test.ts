import request from 'supertest';
import { app } from '../app';

import createConnection from '../database'

describe("Surveys", () => {

    // Roda as migrations no bd de teste:
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    // Testa se foi porssível cadastrar um usuário:
    it("Shold be able to create a new survey!", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Title Example",
            description: "Description Example"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    // Testa se é possível retornar todas as pesquisas cadastradas:
    it("Shold be able to get all surveys!", async () => {
        // Cadastra uma nova pesquisa:
        await request(app).post("/surveys").send({
            title: "Title Example2",
            description: "Description Example2"
        });

        // Faz a consulta:
        const response = await request(app).get("/surveys");

        // Testa se existe as duas pesquisaas cadastradas no banco:
        expect(response.body.length).toBe(2);
    });

});



