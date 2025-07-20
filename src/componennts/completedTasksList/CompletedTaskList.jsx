import { useContext } from "react";

import TaskItem from "../taskItem/TaskItem";
import { MyContext } from "../../App";

function CompletedTaskList() {
  const { completedTasks } = useContext(MyContext);
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default CompletedTaskList;
