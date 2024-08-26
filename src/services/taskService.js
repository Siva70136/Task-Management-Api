const Task = require('../entities/task');
const { AppDataSource } = require('../config/config');

class TaskService {
  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  async createTask(title, description, status, priority, user) {
    const task = this.taskRepository.create({
      title,
      description,
      status,
      priority,
      assignedUser: user
    });

    return this.taskRepository.save(task);
  }

  async getTasks(filter) {
    return this.taskRepository.find({ where: filter });
  }

  async updateTask(task) {
    const item = await this.taskRepository.findOneBy({ id: task.id });
    if (!item) {
      throw new Error('Task not found');
    }
    Object.assign(item, task);
    return this.taskRepository.save(item);
  }

  async deleteTask(taskId) {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new Error('Task not found');
    }

    return await this.taskRepository.remove(task);
  }


}

module.exports = { TaskService };
