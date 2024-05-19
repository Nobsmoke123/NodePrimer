import { FaCheckDouble } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';

const Task = ({ task, index, deleteTask, getSingleTask, setToComplete }) => {
  return (
    <div className={task.completed ? 'task completed' : 'task'}>
      <p>
        <b>({index + 1})</b> <span>&nbsp;</span>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble
          color="green"
          onClick={() => {
            setToComplete(task);
          }}
        />
        <FaEdit
          color="purple"
          onClick={() => {
            getSingleTask(task);
          }}
        />
        <FaRegTrashAlt
          color="red"
          onClick={() => {
            deleteTask(task._id);
          }}
        />
      </div>
    </div>
  );
};

export default Task;

// rafce to bootstrap this code.
