import { FastifyRequest, FastifyReply } from "fastify";
import { CreateTaskService } from "../services/CreateTaskService";

class CreateTaskController {
    async handle(request: FastifyRequest, reply: FastifyReply){

        const { taskName, dueDate, priority, description } = request.body as { taskName: string, dueDate: Date, priority: string, description: string };
        console.log(taskName);

        const taskService = new CreateTaskService()
        const task = await taskService.execute({ taskName, dueDate, priority, description });

        reply.send(task)

    }
}

export { CreateTaskController }