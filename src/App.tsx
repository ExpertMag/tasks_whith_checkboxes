import { observer } from "mobx-react-lite";
import { TasksStore } from "./store/TasksStore";
import { Tasks } from "./Tasks";
import { Input } from "./Input";

function App() {
  return (
    <div className="section">
      <Input />
      <Tasks
        onComplete={(id) => TasksStore.toggleCompleteTask(id)}
        onDelete={(id) => TasksStore.removeTask(id)}
        tasks={TasksStore.tasks.filter((task) => task.parentId === null)}
      />
    </div>
  );
}

export default observer(App);
