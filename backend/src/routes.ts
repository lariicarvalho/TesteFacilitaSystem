import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateTaskController } from "./controllers/CreateTaskController";
import { ListTaskController } from "./controllers/ListTaskController";
import { DeleteTaskControlle } from "./controllers/DeleteTaskController";
import { UpdateTaskController } from "./controllers/UpdateTaskController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok:true }
    })

    fastify.post("/task", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateTaskController().handle(request, reply)
    })

    fastify.get("/tasks", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListTaskController().handle(request, reply)
    })

    fastify.delete("/task", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteTaskControlle().handle(request, reply)
    })

    fastify.post("/update", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateTaskController().handle(request, reply)
    })

    
}