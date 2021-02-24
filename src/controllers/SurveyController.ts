import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositoryes/SurveyRepository";

class SurveyController {

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

};

export { SurveyController };