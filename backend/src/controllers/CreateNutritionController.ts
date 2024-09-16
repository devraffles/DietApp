import { FastifyRequest,  FastifyReply } from "fastify";
import { CreateNutritionServer } from "../servers/CreateNutritionServer";

export interface DataProps{
    name: string; 
    weight: string; 
    height: string; 
    age: string; 
    gender: string; 
    objective: string; 
    level: string
}

class CreateNutritionController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name, weight, height, age, gender, objective, level } = request.body as DataProps;

        const createNutrition = new CreateNutritionServer();

        const nutrition = await createNutrition.execute({ 
            name, 
            weight, 
            height, 
            age, 
            gender, 
            objective, 
            level 
        });

        reply.send(nutrition)
    }
}

export { CreateNutritionController }