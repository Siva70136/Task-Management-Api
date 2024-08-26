const { TaskService } = require('../services/taskService');

const taskService = new TaskService();

exports.createTask = async (req, res) => {
  //console.log(req.user);
  try {
    const task = await taskService.createTask(req.body.title, req.body.description, req.body.status, req.body.priority, req.user);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.query);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const task = await taskService.updateTask(req.body);

      res.status(200).json({ message: 'Task updated successfully', task });
    }
    else {
      res.status(403).json({ message: "Not authorized. Admin role required." });
    }


  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error('Error deleting task:', error);
  }
}

exports.deleteTask = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const task = await taskService.deleteTask(req.body.id);
      res.status(200).json({ message: 'Task deleted successfully' });
    }
    else {
      res.status(403).json({ message: "Not authorized. Admin role required." });
    }

  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task', error: error.message || error });
  }
}

