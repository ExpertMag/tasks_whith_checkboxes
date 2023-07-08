import { useState } from "react";
import { TasksStore } from "./store/TasksStore";

type InputProps = {};

export function Input(props: InputProps) {
  const [text, setText] = useState("");

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
          TasksStore.addTask(text, null);
          setText("");
        }}
      >
        Добавить новую задачу
      </button>

      <hr />
    </div>
  );
}
