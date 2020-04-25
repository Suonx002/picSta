const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const User = require('../models/userModel');

const { hashPassword, comparePassword } = require('../validations/validators');

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

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 'success',
      // user: {
      //   name: newUser.name,
      //   username: newUser.username,
      //   email: newUser.email,
      //   created_at: newUser.created_at,
      // },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: errors.array(),
      });
    }
    const { password, email } = req.body;

    let user = await User.findOne({
      where: {
        email,
      },
      attributes: ['email', 'password', 'created_at'],
    });

    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({
        status: 'fail',
        message: 'Email or password is incorrect',
      });
    }

    res.status(200).json({
      status: 'success',
      user: {
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};
