import prismaClient from "../prisma";

class ListTaskService{

    async execute(){
        const tasks = await prismaClient.task.findMany()
        console.log(tasks)
        return tasks;
    }
}

export { ListTaskService }