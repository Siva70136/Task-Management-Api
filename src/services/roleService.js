const Role = require('../entities/Role');
const { AppDataSource } = require('../config/config');

class RoleService {
  constructor() {
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  async createRole(name) {
    const role = this.roleRepository.create({name});
    return this.roleRepository.save(role);
  }

  async getAllRoles() {
    return this.roleRepository.find();
  }
}

module.exports = { RoleService };
