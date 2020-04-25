const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const { hashPassword, comparePassword } = require('../validations/validators');

const User = require('../models/userModel');

const signToken = (id) => {
  const payload = { id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

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

    newUser.password = undefined;
    const token = signToken(newUser.username);

    res.status(201).json({
      status: 'success',
      token,
      user: newUser,
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
      attributes: ['name', 'username', 'email', 'password', 'created_at'],
    });

    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({
        status: 'fail',
        message: 'Email or password is incorrect',
      });
    }

    user.password = undefined;
    const token = signToken(user.username);

    res.status(200).json({
      status: 'success',
      token,
      user,
    });
  } catch (err) {
    console.log(err.message);
  }
};
