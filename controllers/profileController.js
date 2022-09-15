const { User, Profile, Post} = require('../models')

class Controllers {
  static profile(req, res){
    let {profileName} = req.params
    User.findAll({
      include: [Profile, Post],
      where: {
        username : profileName}
    })
      .then((user) => {
        res.render("profilePage", {user})
      }).catch((err) => {
        res.send(err)
      });
  }
}

module.exports = Controllers