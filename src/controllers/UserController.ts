import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        // Cria o usersRepository:
        const usersRepository = getRepository(User);

        // Faz uma consulta pelo email informado:
        const usersAlreadyExists = await usersRepository.findOne({ email });

        // Verifica se já existe um usuário cadastrado com o email:
        if (usersAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            })
        }

        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);

        return response.json(user);
    }
}

export { UserController };