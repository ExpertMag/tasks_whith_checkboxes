import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { TasksStore } from "./store/TasksStore";
import { Tasks } from "./Tasks";
import { Input } from "./Input";

function App() {
  /*function chengeCheckbox() {
    setChecked(!checked);
  }*/

  console.log(TasksStore.tasks);

  return (
    <div className="section">
      <Input />
      <Tasks
        onComplete={(id) => TasksStore.toggleCompleteTask(id)}
        onDelete={(id) => TasksStore.removeTask(id)}
        tasks={TasksStore.tasks}
      />
    </div>
  );
}

export default observer(App);
