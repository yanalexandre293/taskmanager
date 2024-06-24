'use client';

import { useEffect, useState } from 'react';
import Task from '../../components/Task';
import { useRouter } from 'next/navigation';

interface Task {
  id: number;
  description: string;
  category: string;
  priority: string;
  completed: boolean;
  deadline: Date;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string>('');
    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/');
        }

        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3003/tasks/getAll', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                setError('Erro ao buscar tarefas: ' + error);
            }
        };

        fetchTasks();
    }, [tasks]);

    const handleCompleteTask = async (task: Task) => {
        const updatedTask = { ...task, completed: !task.completed };

        try {
            const response = await fetch('http://localhost:3003/tasks/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                const data = await response.json();
                setTasks((prevTasks) =>
                    prevTasks.map((t) =>
                        t.id === task.id ? data : t
                    )
                );
            } else {
                const errorData = await response.json();
                setError('Erro ao concluir a tarefa: ' + errorData.error);
            }
        } catch (error) {
            console.error('Erro ao concluir a tarefa:', error);
            setError('Erro ao concluir a tarefa: ' + error);
        }
    };

    const removeTask = async (id: number) => {
        try {
            await fetch(`http://localhost:3003/tasks/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            setError('Erro ao remover tarefa: ' + error);
        }
    };

    const filteredTasks = tasks.filter(task => showCompleted || !task.completed);

    const groupedTasks = filteredTasks.reduce((groups, task) => {
        (groups[task.category] = groups[task.category] || []).push(task);
        return groups;
    }, {} as Record<string, Task[]>);


    const showButtonStyle = showCompleted ? 'bg-emerald-800' : 'bg-emerald-500';

    return (
        <div className="container mx-auto px-4 py-8">
            {error === '' ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Tarefas</h1>
                    <div className="mb-6">
                        <button 
                            onClick={() => router.push('/pages/cadastro/cadastroTasks')}
                            className="bg-blue-500 text-white py-1 px-4 rounded mr-4"
                        >
                            Nova Tarefa
                        </button>
                        <button 
                            onClick={() => setShowCompleted(!showCompleted)}
                            className={` text-white py-1 px-4 rounded ${showButtonStyle}`}
                        >
                            {showCompleted ? 'Ocultar Completas' : 'Mostrar Completas'}
                        </button>
                    </div>
                    {tasks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.keys(groupedTasks).map((category) => (
                                <div key={category}>
                                    <h2 className="text-xl font-semibold mb-2">{category}</h2>
                                    <ul className="list-none">
                                        {groupedTasks[category].map((task) => (
                                            <li key={task.id} className="shadow-md rounded-lg overflow-hidden mb-2">
                                                <Task {...task} onComplete={handleCompleteTask} remove={removeTask} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Carregando tasks...</p>
                    )}
                </div>
            ) : (
                <div>
                    <p>Erro ao buscar Tarefas: {error}</p>
                </div>
            )}
        </div>
    );
}
