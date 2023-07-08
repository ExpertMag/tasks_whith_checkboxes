import { useState } from "react";
import { Task, TasksStore } from "./store/TasksStore";
import { observer } from "mobx-react-lite";

type Props = {
  task: Task;
  onDelete: () => void;
  onComplete: () => void;
};

export function TaskItem(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <div
      className="taskItem"
      style={{
        border: "1px solid",
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <p>{props.task.description}</p>
        <p>Количество подзадач: {props.task.subtasks.length}</p>
        <button onClick={props.onDelete}>Delete</button>
        <button onClick={() => setIsOpen(!isOpen)}>Добавить подзадачу</button>

        <input
          type="checkbox"
          checked={props.task.completed}
          onChange={props.onComplete}
        />
      </div>
      {isOpen && (
        <div>
          <input
            type="text"
            placeholder="Описание подзадачи"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button
            onClick={() => {
              if (props.task.id !== undefined) {
                TasksStore.addSubTask(text, props.task.id);
              }
            }}
          >
            Подтвердить
          </button>
        </div>
      )}
      <div>
        {props.task.subtasks.map((subtask) => (
          <div>
            <TaskItem
              task={subtask}
              onDelete={() => {
                if (subtask.id !== undefined) {
                  TasksStore.deleteSubTask(subtask.id);
                }
              }}
              onComplete={() => {
                if (subtask.id !== undefined) {
                  TasksStore.toggleCompleteSubTask(subtask.id);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(TaskItem);
