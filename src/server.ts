import express from 'express';

const app = express();

/**
 * 
 * GET => consultar,
 * POST => salvar,
 * PUT => alterar,
 * DELETE => deletar,
 * PATCH => alteração específica
 */

// --- Rotas:

// http://localhot:3333/users
app.get("/", (request, response) => {
    return response.json({message : "Hello World - NLW04"});
});

// 1 Param -> Rota(Recurso API)
// 2 Param -> request, response

// http://localhost:3333/
app.post("/", (request, response) => {
    // Recebeu os dados para salvar:
    return response.json({message: "Os dados foram salvos com sucesso!"});
});

app.listen(3333, () => console.log("Server is running!"));