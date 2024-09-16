import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateNutritionController } from "./controllers/createNutritionController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/ping", (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ pong: true });
    });

    fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateNutritionController().handle(request, reply)
    });
}