const Task = require('./../model/taskModel');

class TaskController {
  async createTask(req, res) {
    try {
      const task = await Task.create(req.body);
      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: error.message,
      });
    }
  }

  async listTasks(req, res) {
    try {
      const tasks = await Task.find();
      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: error.message,
      });
    }
  }

  async getTask(req, res) {
    try {
      const { taskId } = req.params;

      const task = await Task.findById(taskId);

      if (task) {
        return res.status(200).json(task);
      } else {
        return res.status(404).json({
          msg: 'Task not found.',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: error.message,
      });
    }
  }

  async updateTask(req, res) {
    try {
      const { taskId } = req.params;

      const task = await Task.findOneAndUpdate(
        {
          _id: taskId.toString(),
        },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(201).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: error.message,
      });
    }
  }

  async deleteTask(req, res) {
    try {
      const { taskId } = req.params;
      const task = await Task.findOneAndDelete({ _id: taskId.toString() });
      if (task) {
        return res.status(200).json({
          msg: `${task.name} deleted successfully.`,
        });
      } else {
        return res.status(404).json({
          msg: 'Task not found!',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: error.message,
      });
    }
  }
}

module.exports = new TaskController();
