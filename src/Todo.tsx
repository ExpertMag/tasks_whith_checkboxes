import React from "react";
import { observer } from "mobx-react-lite";
import Todo, { Task } from "./store/Todo";

function funcForMap(elem: Task) {
  if (elem.subtasks.length == 0) {
    console.log(elem.description, " Задачи нет");
  } else {
    const subelem = elem.subtasks.map((subelem) => (
      <div className="subtitle">
        {subelem.description}
        <input type="checkbox" />
      </div>
    ));
  }

  return (
    <div className="Список" key={elem.id}>
      {elem.description}
      <input
        type="checkbox"
        checked={elem.completed}
        onChange={() => {
          Todo.completedTask(elem.id);
        }}
      />
      <button onClick={() => Todo.removeTask(elem.id)}>X</button>
      {/* {subelem} */}
    </div>
  );
}

const TaskVews = observer(() => {
  console.log("render");
  return (
    <div>
      {
        Todo.tasks.map(funcForMap)

        /*elem =>
                <div className="Список">
                {elem.title}
                <input type = "checkbox" key={elem.id} checked = {elem.completed} onChange={() => {Todo.completedTask(elem.id)}}/>
                <button onClick={() => Todo.removeTask(elem.id)}>X</button>
                </div>
            )*/
      }
    </div>
  );
});

export default TaskVews;
