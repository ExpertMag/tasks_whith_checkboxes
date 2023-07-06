import { Task } from "./store/TasksStore";
import { observer } from "mobx-react-lite";

type Props = {
  task: Task;
  onDelete: () => void;
  onComplete: () => void;
};

export function TaskItem(props: Props) {
  return (
    <>
      {props.task.description}
      <button onClick={props.onDelete}>Delete</button>
      <input
        type="checkbox"
        checked={props.task.completed}
        onChange={props.onComplete}
      />
    </>
  );
}

export default observer(TaskItem);
