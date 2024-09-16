import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { routes } from "./router"

const app = Fastify({ logger: true })
dotenv.config();

app.setErrorHandler((error, request, replay) => {
    replay.code(400).send({ message: error.message })
})

const start = async () => {
    app.register(cors);
    app.register(routes);

    try {
        await app.listen({ port: 5000, host: "0.0.0.0" })
        console.log("Server OK rodando em: http://localhost:5000")
    } catch (error) {
        console.log(error)
    }
}

start();