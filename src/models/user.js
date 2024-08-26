const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  target: class User {
    id = undefined;
    username = '';
    password = '';
    role = ''; 
  },
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: true
    },
    username: {
      type: 'varchar',
      length: 255
    },
    password: {
      type: 'varchar',
      length: 255
    },
    role: {
      type: 'varchar',
      length: 255
    }
  }
});
