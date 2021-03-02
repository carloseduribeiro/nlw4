import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository, RepositoryNotTreeError } from "typeorm";
import { SurveyRepository } from "../repositoryes/SurveyRepository";
import { SurveysUsersRepository } from "../repositoryes/SurveysUsersRepository";
import { UsersRepository } from "../repositoryes/UserRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
    
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveyRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // Verifica se o usuário existe pelo email:
        const userAlreadyExists = await usersRepository.findOne({email});
        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists!"
            });
        }

        // Verifica se a survey existe:  
        const surveyAlreadyExists = await surveysRepository.findOne({id: survey_id});
        if (!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exists!"
            });
        }

        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            user_id: userAlreadyExists.id,
            link: process.env.URL_MAIL
        }

        // Grava o caminho do arquivo de template do email:
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        // Verifca se o usuário já recebeu aquela pesquisa:
        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{user_id: userAlreadyExists.id}, {value: null}]
        });
        if (surveyAlreadyExists) {
            await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);
            return response.json(surveyAlreadyExists);
        }

        // Salva as informações na tabela survey_user:
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);

        // Envia um email para o usuário:
        await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController }