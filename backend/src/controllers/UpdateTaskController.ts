import { FastifyRequest, FastifyReply } from "fastify"
import { UpdateTaskService } from "../services/UpdateTaskService"

class UpdateTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){

        const taskService = new UpdateTaskService()
        const { id, taskName, dueDate, priority, description, status } = request.body as {id: string,taskName: string, dueDate: Date, priority: string, description: string, status: boolean}
        const task = await taskService.execute({id, taskName, dueDate, priority, description, status})

        reply.send(task);
    }
}

export { UpdateTaskController }