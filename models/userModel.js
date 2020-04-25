const Sequelize = require('sequelize');
const db = require('../database/query');

const User = db.define(
  'User',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
  }
);

module.exports = User;
