import prismaClient from "../prisma";
import moment from 'moment';

interface CreateTaskProps{
    taskName: string;
    dueDate: Date;
    priority: string;
    description: string
}

class CreateTaskService {

    async execute({ taskName, dueDate, priority, description }: CreateTaskProps){

        console.log(dueDate);
        console.log(description);
        console.log(taskName);
        console.log(priority);

        if(!taskName || !dueDate || !priority){
            throw new Error("Preencha todos os campos")
        }

        const dueDateMoment = moment(dueDate).startOf('day');
        const currentDate = moment().startOf('day');
        if (dueDateMoment.isBefore(currentDate)) {
            throw new Error("Data inválida");
        }


        const task = await prismaClient.task.create({
            data:{
                taskName,
                dueDate,
                priority,
                description,
                status: true
            }
        })

        return task
    }
}

export { CreateTaskService }