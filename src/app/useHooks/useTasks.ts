import { useState, useEffect } from 'react';
import { Task } from '../types/Task'

export const useTasks = (apiUrl: string) => {
  // State to store tasks, initialized as an empty array
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to save tasks to local storage
  const saveTasksToLS = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  };

  // useEffect to fetch tasks on initial load or when apiUrl changes 
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks'); // Retrieve tasks from local storage

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      // If no stored tasks, fetch from API
      fetch(apiUrl)
        .then(response => response.json())
        .then((data: Task[]) => {
          const limitedData = data.slice(0, 10); // Limit to first 10 tasks
          
          setTasks(limitedData); 
          saveTasksToLS(limitedData);
        })
        .catch(error => console.error('Error fetching tasks', error))       
    };
  }, [apiUrl]);

    // useEffect to save tasks to local storage whenever tasks change
    useEffect(() => {
      if (tasks.length > 0) {
        saveTasksToLS(tasks);
      };
    }, [tasks]);
  
  // Function to add a new task
  const addTask = async (newTask: Omit<Task, 'id' | 'completed'>) => {
    const taskWithId: Task = { 
      ...newTask, 
      id: tasks.length + 1, // Genera un nuevo id basado en el número de tareas
      completed: false // Asigna false por defecto a 'completed'
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskWithId),
      })

      if (!response.ok) {
        throw new Error('Error al añadir la tarea')
      }

      const addedTask: Task = await response.json()
      setTasks((prev) => [...prev, addedTask]) // Añade la tarea a la lista de tareas
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  // Function to update an existing task
  const updateTask = (id: number, updatedTasks: Task) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTasks),
    })
      .then(Response => Response.json())
      .then(() => {
        setTasks(prevTasks => 
          prevTasks.map(task => task.id === id? updatedTasks: task)
        );
      })
      .catch(error => console.error('Error updating task', error))
  };

  // Function to delete a task by id
  const deleteTask = (id:number) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(prevTasks =>  prevTasks.filter(task => task.id !== id))
      })
      .catch(error => console.error('Error deleting task', error))
  };

  return { tasks, addTask, updateTask, deleteTask };
}