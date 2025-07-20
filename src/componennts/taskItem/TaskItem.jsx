import { useContext } from "react";

import { MyContext } from "../../App";

function TaskItem({ task }) {
  const { deleteTask, completTask } = useContext(MyContext);
  const { title, priority, deadline, id, completed } = task;
  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">Due: {deadline}</div>
      </div>
      <div className="task-buttons">
        {!completed && (
          <button className="complete-button" onClick={() => completTask(id)}>
            Complete
          </button>
        )}

        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
