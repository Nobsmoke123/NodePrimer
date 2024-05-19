const TaskForm = ({
  createTask,
  name,
  handleInputChange,
  isEditing,
  updateTask,
}) => {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
      <input
        onChange={handleInputChange}
        name="name"
        value={name}
        type="text"
        placeholder="Add a task."
      />
      <button type="submit">{isEditing ? 'Edit' : 'Add'}</button>
    </form>
  );
};

export default TaskForm;
