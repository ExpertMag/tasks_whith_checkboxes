import { makeAutoObservable } from "mobx";

export class Task {
  id: number;
  description: string;
  completed: boolean;
  subtasks: Task[];

  constructor(id: number, description: string, subtasks: Task[]) {
    this.id = id;
    this.description = description;
    this.completed = false;
    this.subtasks = subtasks;
  }
}

class TaskList {
  tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  /*[
        new Task(1,"Задача 1", [new Task(1.1, "Задача 1-1")]),
        new Task(2,"Задача 2", []),
        new Task(3,"Задача 3", []),
        new Task(4,"Задача 4", []),
        new Task(5,"Задача 5", []),
    ];*/

  constructor() {
    makeAutoObservable(this);
  }

  addTask(task: Task) {
    const currentTasks: Task[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    this.tasks.push(task);
    currentTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(currentTasks));
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  completedTask(id: number) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks[i].completed = !this.tasks[i].completed;
        console.log(this.tasks[i].description, this.tasks[i].completed);
        break;
      }
    }
  }
}

export default new TaskList();
