import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { TasksStore } from "./store/TasksStore";
import TodoItem from "./TaskItem";
import { Tasks } from "./Tasks";

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
          TasksStore.addTask({
            completed: false,
            description: text,
            subtasks: [],
          })
        }
      >
        Добавить новую задачу
      </button>
      <Tasks
        onComplete={(id) => TasksStore.completedTask(id)}
        onDelete={(id) => TasksStore.removeTask(id)}
        tasks={TasksStore.tasks}
      />
    </div>
  );
}

export default observer(App);
