import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from '../types/Task'

interface TaskItemProps {
  task: Task;
  updateTask: (id: number, updatedTask: Task) => void;
  deleteTask: (id: number) => void;
};

export default function TaskItem({ task, updateTask, deleteTask }: TaskItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <Checkbox 
          checked={task.completed} 
          onChange={() => updateTask(task.id, { ...task, completed: !task.completed })}
        />
        <div>
          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon">
          <Edit size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
          <Trash2 size={20} />
        </Button>
      </div>
    </li>
  )
}
