const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User',
  tableName: 'clients',
  columns: {
    id: { 
      primary: true,
      type: 'int',
      generated: true,
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
  },
  relations: {
    role: {
      target: 'Role',
      type: 'many-to-one',
      inverseSide: 'users',
      nullable: true,
    },
  },
});
//console.log(User);

module.exports = {User};
