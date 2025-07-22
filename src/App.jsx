import { useState, createContext, useEffect } from "react";
import TaskForm from "./componennts/taskForm/TaskForm";
import TaskList from "./componennts/taskList/TaskList";
import CompletedTaskList from "./componennts/completedTasksList/CompletedTaskList";
import Footer from "./componennts/footer/Footer";

export const MyContext = createContext();

function App() {
  const [isOpen, setIsOpen] = useState({
    taskList: false,
    tasks: true,
    completedTasks: false,
  });
  const [tasks, setTasks] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  function toggleSection(section) {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }

  function sortTask(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "asc"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
      }
    });
  }

  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem("toDoTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("toDoTasks", JSON.stringify(tasks));
    }
  }, [tasks, isInitialized]);

  const activeTasks = sortTask(tasks.filter((task) => !task.completed));
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <MyContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        deleteTask,
        activeTasks,
        completedTasks,
        completTask,
      }}
    >
      <div className="app">
        <div className="task-container">
          <h1>Task List with Priority</h1>
          <button
            className={`close-button ${isOpen.taskList ? "open " : ""}`}
            onClick={() => toggleSection("taskList")}
          >
            +
          </button>
          {isOpen.taskList && <TaskForm />}
        </div>
        <div className="task-container">
          <h2>Tasks</h2>
          <button
            className={`close-button ${isOpen.tasks ? "open " : ""}`}
            onClick={() => toggleSection("tasks")}
          >
            +
          </button>
          <div className="sort-controls">
            <button
              className={`sort-button ${sortType === "date" ? "active" : ""}`}
              onClick={() => toggleSortOrder("date")}
            >
              By Date
              {sortType === "date" &&
                (sortOrder === "asc" ? "\u2191" : "\u2193")}
            </button>
            <button
              className={`sort-button ${
                sortType === "priority" ? "active" : ""
              }`}
              onClick={() => toggleSortOrder("priority")}
            >
              By Priority
              {sortType === "priority" &&
                (sortOrder === "asc" ? "\u2191" : "\u2193")}
            </button>
          </div>
          {isOpen.tasks && <TaskList />}
        </div>
        <div className="completed-task-container">
          <h2>Completed Tasks</h2>
          <button
            className={`close-button ${isOpen.completedTasks ? "open " : ""}`}
            onClick={() => toggleSection("completedTasks")}
          >
            +
          </button>
          {isOpen.completedTasks && <CompletedTaskList />}
        </div>
        <Footer />
      </div>
    </MyContext.Provider>
  );
}

export default App;
