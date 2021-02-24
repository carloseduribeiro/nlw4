import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositoryes/SurveyRepository";

class SurveyController {

    // Cria uma nova survey:
    async create(request: Request, response: Response) {

        const { title, description } = request.body;

        // Criar o repository:
        const surveyRepository = getCustomRepository(SurveyRepository);

        const survey = surveyRepository.create({
            title,
            description
        });

        // Salva a pesquisa no bd:
        await surveyRepository.save(survey);

        // Retorna a pesquisa criada:
        return response.status(201).json(survey);

    }

    // Retorna todas as surveys cadastradas:
    async show(request: Request, response: Response) {
        
        // Criar o repository:
        const surveyRepository = getCustomRepository(SurveyRepository);

        const all = await surveyRepository.find();

        return response.json(all);
    }

};

export { SurveyController };