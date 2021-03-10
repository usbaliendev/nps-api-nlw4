import { AppError } from './../errors/AppError';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {

    /**
     * http://localhost:3333/answers/6?u=c040f4a9-72ab-4bbe-81bf-b73f1335f375
     * Route parameters => parameter that build the route
     * routes.get("/answers/:value/:nota/:parameter")
     * 
     * Query Parameters => Search, Paging, Not mandatory
     * comes always after the ?
     * key = value => ? u = c040f4a9-72ab-4bbe-81bf-b73f1335f375
     */
    async execute(request: Request, response: Response){
        const {value} = request.params;
        const {u} = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists!");
            // return response.status(400).json({
            //     error: "Survey User does not exists!",
            // });
        }

        surveyUser.value = Number(value);
        
        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };