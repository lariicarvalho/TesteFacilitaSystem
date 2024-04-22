import prismaClient from '../prisma';
import moment from 'moment';

interface UpdateTaskProps{
    id: string;
    taskName: string;
    dueDate: Date;
    priority: string;
    description: string;
    status: boolean
}

class UpdateTaskService{

    async execute({id,taskName, dueDate, priority, description, status}: UpdateTaskProps){
        console.log(taskName)

        if(!taskName || !dueDate || !priority || description){
            throw new Error("Preencha todos os campos")
        }
        
        const dueDateMoment = moment(dueDate);
        const currentDate = moment();
        if (dueDateMoment.isBefore(currentDate)) {
            throw new Error("Data inválida");
        }


        const task = await prismaClient.task.update({
            where:{
                id: id
            },
            data:{
                taskName,
                dueDate,
                priority,
                description,
                status
            }
        })

        return task
    }
}

export { UpdateTaskService }