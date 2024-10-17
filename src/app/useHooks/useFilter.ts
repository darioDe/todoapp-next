import { useState } from 'react';
import { Task } from '../types/Task'

export const useFilter = (tasks: Task[]) => {
    // State for the current filter (either 'all', 'completed', or 'active')
    const [filter, setFilter] = useState<string>('all');
    // State to manage the current search term
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filtered tasks based on the selected filter and search term
    const filteredTasks = tasks.filter((task) => {
        const matchesSearchTerm = task.title.toLowerCase().includes(searchTerm.toLowerCase()); // Check if the task title includes the search term (case-insensitive)

        if (filter === 'completed') {
            return task.completed && matchesSearchTerm
        } else if (filter === 'active') {
            return !task.completed && matchesSearchTerm
        };

        return matchesSearchTerm
    });

    return { filter, setFilter, searchTerm, setSearchTerm, filteredTasks };
};