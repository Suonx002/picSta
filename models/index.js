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

const Post = db.define(
  'Post',
  {
    post_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      references: {
        model: 'User',
        key: 'username',
      },
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Post, { as: 'Posts' });
// Post.belongsTo(User, { foreignKey: 'username' });
Post.belongsTo(User, { foreignKey: 'username', foreignKeyConstraint: true });

// Post.belongsTo(User, { foreignKey: 'username' });
// Post.associate = (models) => {
//   Post.belongsTo(models.User, { as: 'User', foreignKey: 'username' });
// };

module.exports = {
  User,
  Post,
};
