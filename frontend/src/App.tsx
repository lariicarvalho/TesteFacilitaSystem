import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash, FiEdit } from "react-icons/fi";
import { api } from "./services/api";
import moment from "moment";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { AxiosError } from "axios";


interface TasksProps {
  id: string;
  taskName: string;
  dueDate: string;
  priority: string;
  description: string;
  status: boolean;
  created_at: string
}

export default function App(){

  const [tasks, setTasks] = useState<TasksProps[]>([])
  const nameTaskRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
  const dueDateRef = useRef<HTMLInputElement | null>(null)
  const priorityRef = useRef<HTMLSelectElement | null>(null)


  useEffect(() => {
    loadTasks();
  }, [])

  //Função para carregar as tarefas enviadas
  async function loadTasks() {
    const response = await api.get("/tasks")
    setTasks(response.data);
    
  }

  //Função para cadastrar as tarefas e enviar para o banco
  async function handleSubmit(event: FormEvent){

    const MySwal = withReactContent(Swal)
    try{
      event.preventDefault();

    const dueDate = moment(dueDateRef.current?.value).format('YYYY-MM-DDTHH:mm:ss.SSSZ')

    if(!nameTaskRef.current?.value || !descriptionRef.current?.value || !priorityRef.current?.value) return;

    const response = await api.post("/task", {
      taskName: nameTaskRef.current?.value,
      description: descriptionRef.current?.value,
      dueDate: dueDate,
      priority: priorityRef.current?.value
    })

    setTasks(allTasks => [...allTasks, response.data])

    nameTaskRef.current.value = ""
    descriptionRef.current.value = ""
    priorityRef.current.value = ""
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        MySwal.fire({
          title: "Error!",
          html: `<span>Something is wrong.</span><br> ${error.response?.data.message}`,
          icon: "error"
        });
      }
    }

  }

  //Função para deletar as tarefas
   async function deleteTask(id: string){
    const MySwal = withReactContent(Swal)
    try {
      MySwal.fire({
        title: "Tem certeza que deseja apagar?",
        text: "Esta ação não poderá ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar!",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await api.delete("/task", {
            params: {
              id: id,
            }
          })
  
          const allTasks = tasks.filter((task)=> task.id !== id)
          setTasks(allTasks)
          Swal.fire({
            title: "Apagado!",
            text: "Sua tarefa foi excluida.",
            icon: "success"
          });
        }
      });

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        MySwal.fire({
          title: "Error!",
          html: `<span>Something is wrong.</span><br> ${error.response?.data.message}`,
          icon: "error"
        });
      } else {
        MySwal.fire({
          title: "Error!",
          html: `<span>Something is wrong.</span><br>`,
          icon: "error"
        });
      }
    }
    
  } 

  //Função para editar a tarefa
  async function editTask(id: string, nameTask: string, description: string, dueDate: string, priority: string){
  const MySwal = withReactContent(Swal)
  dueDate = moment(dueDate).format("YYYY-MM-DD")

  MySwal.fire({
    title: "<strong>Editar item</strong>",
    html: `<form class="flex flex-col my-6">
            <input id="id" type="text" class="hidden" value="${id}">
              <label class="font-medium text-black text-left	">Tarefa:</label>
                <input
                  id="nameTask" 
                  class="w-full mb-2 p-2 rounded border-2 border-black-500" 
                  type="text" 
                  value="${nameTask}" 
                  placeholder="Type the name of task"
                />

              <label class="font-medium text-white">Descrição:</label>
                <textarea
                  placeholder="Digite aqui a descrição..."
                  class="w-full mb-7 p-2 rounded border-2 border-black-500"
                  value={description}
                  onChange={(e) => "${description}"
                </textarea>

              <div class="grid grid-cols-2 gap-x-2 mb-5">
                <div class="text-left">
                  <label class="font-medium text-black">Data:</label>
                  <div>
                    <input
                      id= "dueDate"
                      class="w-full p-2 rounded h-10 border-2 border-black-500"
                      type="date" 
                      value="${dueDate}"
                    />
                  </div>
              </div>
            
              <div class="text-left">
                <label class="font-medium text-black">Prioridade:</label>
                <div>
                  <select id="priority" class="w-full rounded p-2 h-10 border-2 border-black-500">
                    <option value="Normal" ${priority === "Normal" ? "selected" : ""}>Normal</option>
                    <option value="Alta" ${priority === "Alta" ? "selected" : ""}>Alta</option>
                    <option value="Urgente" ${priority === "Urgente" ? "selected" : ""}>Urgente</option>
                  </select>
                </div>
              </div>
            </div>
          </form>`,

    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `Salvar`,
    cancelButtonText: `Cancelar`
  }).then(async (result) => {
    if (result.isConfirmed) {
      const id = document.getElementById('id') as HTMLInputElement
      const nameTask = document.getElementById('nameTask') as HTMLInputElement;
      const dueDateInput = document.getElementById('dueDate') as HTMLInputElement;
      const dueDate = dueDateInput ? moment(dueDateInput.value).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null;
      const priority = document.getElementById('priority') as HTMLSelectElement;
      const description = document.getElementById('description') as HTMLInputElement;

      
      
      const response = await api.post("/update",{
        id: id.value,
        taskName: nameTask.value,
        dueDate: dueDate,
        priority: priority.value,
        description: description.value
      })

      setTasks(allTasks => {
        const updatedTasks = allTasks.map(task => {
          if (task.id === response.data.id) {
            return response.data;
          }
          return task;
        });
        return updatedTasks;
      });
    }
  });
}



  return(
    
    <div className="w-full min-h-screen  flex justify-center px-4 text-slate-600 bg-gradient-to-r from-slate-900 to-indigo-900">
      <main className="my-10 w-full md:max-w-2xl">
      <div className="flex justify-center items-center">
        <img src="public/facilita-logo.png" />
      </div>
       

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="block font-medium text-white uppercase">Tarefa:</label>
          
            
          <input
            type="text"
            placeholder="Digite a sua tarefa..."
            className="w-full mb-5 p-2 rounded"
            ref={ nameTaskRef }
            required
          />

          <label className="font-medium text-white uppercase">Descrição:</label>
          <textarea
            placeholder="Detalhe aqui a sua tarefa..."
            className="w-full mb-5 p-2 rounded"
            ref={ descriptionRef }
            required
          />

          <div className="grid grid-cols-2 gap-x-2 mb-5">
            <div>
              <label className="font-medium text-white uppercase">Data:</label>
              <input
                type="date"
                placeholder="Digite aqui a descrição..."
                className="w-full mb-5 p-2 rounded h-10"
                ref={ dueDateRef }
                required
              />  
            </div>

            <div>
              <label className="font-medium text-white uppercase">Prioridade:</label>
              <div>
                <select className="w-full mb-5 rounded p-2 h-10" ref={priorityRef} required>
                  <option value="Normal">Normal</option>
                  <option value="Alta">Alta</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>
            </div>
            
          </div>
          

          <input 
            type="submit"
            value="Cadastrar"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-bold text-md px-5 py-2.5 text-center rounded-md uppercase"
          />
        </form>

        <section className="flex flex-col gap-4">

          {tasks.map( (task) => (
            <article 
            key= {task.id}
            className="w-full bg-white rounded p-2 relative hover:scale-105 duration-300">

              <p><span className="font-medium">Tarefa:</span> { task.taskName }</p>
              <p><span className="font-medium">Descrição:</span> { task.description }</p>
              <p><span className="font-medium">Prazo:</span> { moment(task.dueDate).format("DD/MM/YYYY") }</p>
              <p><span className="font-medium">Prioridade:</span> { task.priority }</p>

              <button
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-2 -top-3"
                onClick={() => deleteTask(task.id)}
              >
                <FiTrash size={18} color="#FFF" />
              </button>

              <button
                className="bg-blue-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-11 -top-3"
                onClick={() => editTask(task.id, task.taskName, task.description, task.dueDate, task.priority)}
              >
                <FiEdit size={18} color="#FFF" />
              </button>

            </article>
          ))}

        </section>

      </main>
    </div>
  )

}