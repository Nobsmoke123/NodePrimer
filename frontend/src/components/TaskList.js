import { useEffect, useState } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import { URL } from '../App';
import loadingImg from './../assets/loader.gif';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [taskID, setTaskID] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setIsLoading(false);
      setTasks(data);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === '') {
      return toast.error("Input field can't be empty.");
    }
    setIsLoading(true);
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      setFormData({
        ...formData,
        name: '',
      });
      await getTasks();
      setIsLoading(false);
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({
      name: task.name,
      completed: false,
    });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };
    setIsLoading(true);

    try {
      await axios.patch(`${URL}/api/tasks/${task._id}`, newFormData);
      await getTasks();
      setIsLoading(false);
      toast.success('Task completed successfully.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === '') {
      return toast.error("Input field can't be empty.");
    }
    const ID = taskID;

    setIsLoading(true);
    try {
      await axios.patch(`${URL}/api/tasks/${ID}`, formData);
      setFormData({
        ...formData,
        name: '',
      });
      await getTasks();
      setIsLoading(false);
      setIsEditing(false);
      setTaskID('');
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const cTasks = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(cTasks);
  }, [tasks]);

  const deleteTask = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      await getTasks();
      setIsLoading(false);
      toast.success('Task deleted successfully.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        createTask={createTask}
        name={name}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> <b>{tasks.length}</b>
        </p>
        <p>
          <b>Completed Tasks:</b> <b>{completedTasks.length}</b>
        </p>
      </div>
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="loading" />
        </div>
      )}
      {!isLoading && tasks.length !== 0 ? (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                deleteTask={deleteTask}
                key={task._id}
                task={task}
                index={index}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      ) : (
        <p className="--py">No task added. Please add a task</p>
      )}
    </div>
  );
};

export default TaskList;
