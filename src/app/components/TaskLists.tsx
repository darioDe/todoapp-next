import TaskItem from './TaskItem';
import { Task } from '../types/Task'

interface TaskListProps {
  tasks: Task[];
  updateTask: (id: number, updatedTask: Task) => void;
  deleteTask: (id: number) => void;
};

export default function TaskList({ tasks, updateTask, deleteTask }: TaskListProps) {
    return (
      <ul className="space-y-4">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </ul>
    )
  }


