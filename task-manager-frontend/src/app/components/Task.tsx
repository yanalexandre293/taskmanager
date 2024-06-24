// src/app/components/Task.tsx

interface TaskProps {
    id: number;
    description: string;
    category: string;
    priority: string;
    completed: boolean;
    deadline: Date;
    onComplete: (task: TaskProps) => void;
    remove: (id: number) => void;
  }
  
  export default function Task(props: TaskProps) {
    const completedStyle = props.completed ? 'text-green-500' : 'text-red-500';
    const priorityStyle = props.priority === 'Alta' ? 'text-red-500' : 'text-green-500';
  
    return (
      <div className="bg-white rounded-lg shadow-md px-4 py-6 mb-4 text-gray-950">
        <h3 className="text-lg font-medium mb-2">{props.description}</h3>
        <div className="flex items-center mb-2">
            <p className="text-sm mr-2">Categoria: {props.category}</p>
        </div>
        <div className="flex items-center mb-2">
            <p className={`text-sm mr-2 ${priorityStyle}`}>
                Prioridade: {props.priority}
            </p>
        </div>
        <div className="flex items-center">
            <p className={`text-sm mr-2 ${completedStyle}`}>Completa: {props.completed ? 'Sim' : 'Não'}</p>
            <p className="text-sm">Prazo: {new Date(props.deadline).toLocaleDateString()}</p>
        </div>
        <button 
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded mr-1"
          onClick={() => props.onComplete(props)}
        >
          Concluir Tarefa
        </button>

        <button 
          onClick={() => props.remove(props.id)}
          className="mt-2 bg-red-500 text-white py-1 px-4 rounded ml-1"
        >
          Remover Tarefa
        </button>
      </div>
    );
  }
  