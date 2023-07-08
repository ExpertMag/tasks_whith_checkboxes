import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { TasksStore } from "./store/TasksStore";

type InputProps = {};

export function Input(props: InputProps) {
  const [text, setText] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div>
      <input
        value={text}
        placeholder="Текст задачи"
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button
        onClick={() => {
          TasksStore.addTask({
            completed: false,
            description: text,
            subtasks: [],
          });
          setText("");
        }}
      >
        Добавить новую задачу
      </button>

      <hr />
    </div>
  );
}
