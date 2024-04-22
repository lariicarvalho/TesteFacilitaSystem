import { FastifyRequest, FastifyReply } from "fastify";
import { ListTaskService } from "../services/ListTaskService";

class ListTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listTaskService = new ListTaskService();

        const tasks = await listTaskService.execute();

        reply.send(tasks)
    }
}

export { ListTaskController }