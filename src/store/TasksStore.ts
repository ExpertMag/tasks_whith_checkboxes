import { makeAutoObservable, remove } from "mobx";

export class Task {
  id?: number;
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
  private idCounter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addTask(task: Task) {
    const newTask: Task = {
      description: task.description,
      completed: task.completed,
      id: this.idCounter++,
      subtasks: task.subtasks,
    };

    const updatedTasks = [...this.tasks];
    updatedTasks.push(newTask);
    this.tasks = updatedTasks;

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  removeTask(id: number) {
    const updatedTasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = updatedTasks;
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  toggleCompleteTask(id: number) {
    this.tasks.forEach((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
  }

  addSubTask(text: string, parentTaskId: number) {
    const copy = [...this.tasks];
    copy.forEach((task) => {
      if (task.id === parentTaskId) {
        const newTask: Task = {
          description: text,
          completed: false,
          id: this.idCounter++,
          subtasks: [],
        };

        task.subtasks.push(newTask);
      }
    });

    this.tasks = copy;
  }

  deleteSubTask(id: number) {}
  toggleCompleteSubTask(id: number) {}
}

export const TasksStore = new TaskList();

const arr = [
  {
    completed: false,
    description: "Parent",
    subtasksIds: [2],
    id: 1,
  },
  {
    completed: false,
    description: "Child",
    subtasksIds: [],
    id: 2,
  },
];

function removeTask(id: number) {
  return arr.filter((task) => task.id !== id);
}

removeTask(2);
