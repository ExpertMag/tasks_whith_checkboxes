import { useState } from "react";
import { Task, TasksStore } from "./store/TasksStore";
import { observer } from "mobx-react-lite";
import arrow from "./img/right_arrow_icon.svg";

type Props = {
  task: Task;
  onDelete: () => void;
  onComplete: () => void;
};

export function TaskItem(props: Props) {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="taskItem">
      <div
        className="task"
        onClick={() => setIsDropdownOpened(!isDropdownOpened)}
      >
        <img
          src={arrow}
          width={20}
          className={"arrow " + (isDropdownOpened ? "rotated" : "")}
          alt=""
        />
        <p className="taskDescription">{props.task.description}</p>
        <p>Количество подзадач: {props.task.subtasksIds.length}</p>
        <div onClick={(event) => event.stopPropagation()}>
          <button onClick={props.onDelete}>Удалить задачу</button>
          <button onClick={() => setIsOpen(!isOpen)}>Добавить подзадачу</button>

          <input
            type="checkbox"
            checked={props.task.completed}
            onChange={props.onComplete}
          />
        </div>
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
                console.log("props.task.id=", props.task.id);
                TasksStore.addTask(text, props.task.id);
              }
            }}
          >
            Подтвердить
          </button>
        </div>
      )}
      {isDropdownOpened && (
        <div>
          {props.task.subtasksIds.map((id) => {
            const subtask = TasksStore.getTaskById(id);
            if (subtask === undefined) {
              return null;
            }
            return (
              <div>
                <TaskItem
                  task={subtask}
                  onDelete={() => {
                    if (subtask.id !== undefined) {
                      TasksStore.removeTask(subtask.id);
                    }
                  }}
                  onComplete={() => {
                    if (subtask.id !== undefined) {
                      TasksStore.toggleCompleteTask(subtask.id);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default observer(TaskItem);
