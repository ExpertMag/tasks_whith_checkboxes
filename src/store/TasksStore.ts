import { makeAutoObservable } from "mobx";

export type Task = {
  id?: number;
  description: string;
  completed: boolean;
  subtasksIds: number[];
  parentId: number | null;
};

class TaskList {
  tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

  constructor() {
    makeAutoObservable(this);
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask(description: string, parentTaskId: number | null) {
    const newTask: Task = {
      description: description,
      completed: false,
      id: this.tasks.length,
      subtasksIds: [],
      parentId: parentTaskId,
    };

    const updatedTasks = [...this.tasks];
    if (parentTaskId !== null) {
      const parent = updatedTasks.find((task) => task.id === parentTaskId);
      parent?.subtasksIds.push(this.tasks.length);
    }
    updatedTasks.push(newTask);
    this.tasks = updatedTasks;

    this.updateLocalStorage();
  }

  removeTask(idToDelete: number) {
    const updatedTasks = this.tasks.filter((task) => task.id !== idToDelete);

    updatedTasks.forEach((task) => {
      const idIndex = task.subtasksIds.findIndex((id) => id === idToDelete);
      if (idIndex !== -1) {
        task.subtasksIds.splice(idIndex, 1);
      }
    });

    this.tasks = updatedTasks;
    this.updateLocalStorage();
  }

  toggleCompleteTask(id: number) {
    this.tasks.forEach((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });

    this.updateLocalStorage();
  }
}

export const TasksStore = new TaskList();
