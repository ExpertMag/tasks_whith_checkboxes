import TaskItem from "./TaskItem";
import { Task } from "./store/TasksStore";

type Props = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
};

export function Tasks(props: Props) {
  return (
    <div className="taskList">
      {props.tasks.map((task) => (
        <TaskItem
          key={task.id}
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
