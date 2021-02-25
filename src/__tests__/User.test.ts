import request from 'supertest';
import { app } from '../app';

import createConnection from '../database'

describe("Users", () => {

    // Roda as migrations no bd de teste:
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    // Testa se foi porssível cadastrar um usuário:
    it("Shold be able to create a new user!", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User"
        });

        expect(response.status).toBe(201);
    });

    // Testa o cadastro com um email já cadastrado:
    it("Shold not be able to create a new user with exists email!", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User"
        });

        expect(response.status).not.toBe(201);
    });
});



