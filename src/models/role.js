const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Role',
  target: class Role {
    id = undefined;
    name = ''; 
  },
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: true
    },
    name: {
      type: 'varchar',
      length: 255
    }
  }
});
