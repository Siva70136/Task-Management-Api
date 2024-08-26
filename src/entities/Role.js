const { EntitySchema } = require('typeorm');

const Role = new EntitySchema({
  name: 'Role',
  tableName: 'roles',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    clients: {
      target: 'User',
      type: 'one-to-many',
      inverseSide: 'role',
    },
  },
});

module.exports = Role;
