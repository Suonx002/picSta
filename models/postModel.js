// const Sequelize = require('sequelize');
// const db = require('../database/query');

// const User = require('./userModel');

// const Post = db.define(
//   'Post',
//   {
//     post_id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     photo: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     created_at: {
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.NOW,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// // Post.belongsTo(User, { foreignKey: 'username' });
// // Post.associate = (models) => {
// //   Post.belongsTo(models.User, { as: 'User', foreignKey: 'username' });
// // };
// Post.belongsTo(User);

// module.exports = Post;
