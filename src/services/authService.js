const { User } = require('../entities/user');
const Role =require('../entities/Role');
const { AppDataSource } = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


class AuthService {
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.roleRepository=  AppDataSource.getRepository(Role);
  }

  async register(username, password, roleName) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = await this.roleRepository.findOne({ where: { name: roleName } });

    if (!role) {
      throw new Error('Role not found');
    }
    const userData = { username, password: hashedPassword, role }
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async login(username, password) {
    
    const user = await this.userRepository.findOne({ where:{username},relations: ['role'], });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return jwt.sign({ id: user.id, role: user.role.name }, process.env.SECRET_KEY, { expiresIn: '24h' });
  }
}

module.exports = { AuthService };
