const { EntitySchema } = require('typeorm');

const Task = new EntitySchema({
  name: 'Task',
  tableName: 'tasks',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
    status: {
      type: 'varchar',
    },
    priority: {
      type: 'varchar',
    },
  },
  relations: {
    assignedUser: {
      target: 'User',
      type: 'many-to-one',
      inverseSide: 'tasks',
      nullable: true,
      joinColumn: {
        name: 'assignedUserId',
      },
    },
  },
});

module.exports = Task;
