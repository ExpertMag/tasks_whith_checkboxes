import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { makeAutoObservable } from 'mobx';

interface Task {
  id: number;
  title: string;
  subTasks?: Task[];
  completed: boolean;
}

class TaskStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  toggleTaskCompletion(taskId: number) {
    const task = this.findTaskById(taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  findTaskById(taskId: number): Task | undefined {
    return this.tasks.find((task) => task.id === taskId);
  }
}

const taskStore = new TaskStore();

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = () => {
    taskStore.toggleTaskCompletion(task.id);
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
        />
        {task.title}
      </label>
      <button onClick={toggleOpen}>Toggle</button>
      {isOpen && task.subTasks && (
        <ul>
          {task.subTasks.map((subTask) => (
            <TaskItem key={subTask.id} task={subTask} />
          ))}
        </ul>
      )}
    </li>
  );
});


const TaskList: React.FC = observer(() => {
  return (
    <ul>
      {taskStore.tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
});

const App: React.FC = () => {
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      subTasks: [
        {
          id: 2,
          title: 'Subtask 1.1',
          completed: false,
        },
        {
          id: 3,
          title: 'Subtask 1.2',
          subTasks: [
            {
              id: 4,
              title: 'Subtask 1.2.1',
              completed: false,
            },
            {
              id: 5,
              title: 'Subtask 1.2.2',
              completed: false,
            },
          ],
          completed: false,
        },
      ],
      completed: false,
    },
    {
      id: 6,
      title: 'Task 2',
      completed: false,
    },
  ];

  tasks.forEach((task) => taskStore.addTask(task));

  return (
    <div>
      <h1>Список задач</h1>
      <TaskList />
    </div>
  );
};

export default App;
