'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Email required"
        },
        notEmpty : {
          msg : "Email can not be Empty"
        },
        isEmail : {
          msg : "Email must be email format"
        }
      }   
    },
    password: {
       type : DataTypes.STRING,
       allowNull : false,
       validate : {
        notNull : {
          msg : "Password required"
        },
        notEmpty : {
          msg : "Password can not be Empty"
        },
        min : {
          args : 8,
          msg : "Password minimal 8 character"
        }
       }
      },
    phone: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

    User.beforeCreate((instance, option) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(instance.password, salt);
      instance.password = hash
    })

    


  return User;
};