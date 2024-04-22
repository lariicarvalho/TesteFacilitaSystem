import { FastifyRequest, FastifyReply } from "fastify"
import { UpdateTaskService } from "../services/UpdateTaskService"

class UpdateTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){

        const taskService = new UpdateTaskService()
        const { id, taskName, dueDate, priority, status } = request.body as {id: string,taskName: string, dueDate: Date, priority: string, status: boolean}
        const task = await taskService.execute({id, taskName, dueDate, priority, status})

        reply.send(task);
    }
}

export { UpdateTaskController }