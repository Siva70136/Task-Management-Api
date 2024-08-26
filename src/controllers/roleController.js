const { RoleService } = require('../services/roleService');

const roleService = new RoleService();

exports.createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body.name);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
