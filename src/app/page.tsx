'use client'

import { useTasks } from "./useHooks/useTasks";
import { useFilter } from "./useHooks/useFilter";
import TaskLists from "./components/TaskLists";
import SearchBar from "./components/SearchBar";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import FilterButtons from "./components/FilterButtons";



export default function Home() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    const { tasks, addTask, updateTask, deleteTask } = useTasks(apiUrl);
    const { filter, setFilter, searchTerm, setSearchTerm, filteredTasks } = useFilter(tasks);

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 sm:p-6 lg:p-8">
                    <h1 className="text-2xl font-bold text-center mb-6">Mi Lista de Tareas</h1>
          
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    <FilterButtons filter={filter} setFilter={setFilter} />

                    <Button onClick={() => addTask({ title: 'Nueva tarea', description: 'Descripción de la tarea' })}>
                        <Plus size={20} className="mr-2" />
                        Nueva Tarea
                    </Button>

                    <TaskLists tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
                </div>
            </div>
        </div>
    )
}