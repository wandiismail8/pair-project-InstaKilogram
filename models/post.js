'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
    }
    static photo(data){
      const foto = data.profileImage + "?w=500&h=500&fit=crop"
      return foto
    }
  }
  Post.init({
    caption: DataTypes.TEXT,
    postImage: DataTypes.STRING,
    postDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (data) => {
        data.profileImage = Post.photo(data)
        data.postDate = new Date()
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};