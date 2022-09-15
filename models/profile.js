'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
    static photo(data){
      const foto = data.profileImage + "?w=152&h=152&fit=crop"
      return foto
    }
    date(){
      return this.birthDate.toISOString().split('T')[0]
    }
  }
  Profile.init({
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    bio: DataTypes.TEXT,
    profileImage: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (data) => {
        data.profileImage = Profile.photo(data)
      }
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};