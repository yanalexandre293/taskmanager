'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewTaskPage() {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Usuário não autenticado');
            return;
        }

        const newTask = {
            description,
            category,
            priority,
            completed: false,
            deadline: new Date(deadline),
        };

        try {
            const response = await fetch('http://localhost:3003/tasks/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                setSuccess('Tarefa criada com sucesso');
                setError('');
                setDescription('');
                setCategory('');
                setPriority('');
                setDeadline('');
                setTimeout(() => {
                    router.push('/pages/tasks');
                }, 2000);
            } else {
                setSuccess('');
            }
        } catch (error) {
            setError('Erro ao criar tarefa: ' + error);
            setSuccess('');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Nova Tarefa</h1>
            <div className="bg-white rounded-lg shadow-md p-4 text-gray-950">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="description">Descrição</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="category">Categoria</label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="priority">Prioridade</label>
                    <input
                        id="priority"
                        type="text"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="deadline">Prazo</label>
                    <input
                        id="deadline"
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleSubmit}
                >
                    Criar Tarefa
                </button>
            </div>
        </div>
    );
}
