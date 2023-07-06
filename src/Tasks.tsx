import TodoItem from "./TaskItem";
import { Task } from "./store/TasksStore";

type Props = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
};

export function Tasks(props: Props) {
  return (
    <div>
      {props.tasks.map((task) => (
        <TodoItem
          task={task}
          onComplete={() => {
            if (task.id !== undefined) {
              props.onComplete(task.id);
            }
          }}
          onDelete={() => {
            if (task.id !== undefined) {
              props.onDelete(task.id);
            }
          }}
        />
      ))}
    </div>
  );
}
