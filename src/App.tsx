import React, { useState } from "react";
import TaskVews from "./Todo";
import { observer } from "mobx-react-lite";
import Todo from "./store/Todo";

function App() {
  const [text, setText] = useState("");

  /*function chengeCheckbox() {
    setChecked(!checked);
  }*/

  return (
    <div className="section">
      <input
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button
        onClick={() =>
          Todo.addTask({
            completed: false,
            description: text,
            id: 0,
            subtasks: [],
          })
        }
      >
        Добавить новую задачу
      </button>
      <TaskVews />
    </div>
  );
}

export default observer(App);
