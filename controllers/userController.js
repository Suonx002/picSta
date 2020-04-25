const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: errors.array(),
      });
    }

    const { name, username, email, password } = req.body;
    const user = await User.findAll({
      where: {
        [Op.or]: [{ username }, { email }],
      },
      // attributes: { exclude: ['password'] },
    });

    if (user.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Username or email is taken, please try a different one!',
      });
    }

    const newUser = await User.create({
      name,
      username,
      email,
      password,
    });

    res.status(201).json({
      status: 'success',
      user: {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        created_at: newUser.created_at,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};
