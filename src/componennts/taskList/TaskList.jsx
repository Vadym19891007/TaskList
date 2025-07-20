import { useContext } from "react";

import TaskItem from "../taskItem/TaskItem";
import { MyContext } from "../../App";

function TaskList() {
  const { activeTasks } = useContext(MyContext);
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
