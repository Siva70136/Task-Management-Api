const { AuthService } = require('../services/authService');

const authService = new AuthService();

exports.register = async (req, res) => {
  const {username,password,role}=req.body;
  
  try {
    const user = await authService.register(username, password,role);
    res.status(201).json(user);
  } catch (error) {
    console.log("error",error);
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {

  try {
    const token = await authService.login(req.body.username, req.body.password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
