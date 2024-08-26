const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Task',
  target: class Task {
    id = undefined;
    title = '';
    description = '';
    status = ''; // e.g., 'pending', 'completed'
    priority = ''; // e.g., 'low', 'medium', 'high'
    assignedUser = ''; // User ID
  },
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: true
    },
    title: {
      type: 'varchar',
      length: 255
    },
    description: {
      type: 'text'
    },
    status: {
      type: 'varchar',
      length: 255
    },
    priority: {
      type: 'varchar',
      length: 255
    },
    assignedUser: {
      type: 'uuid'
    }
  }
});
