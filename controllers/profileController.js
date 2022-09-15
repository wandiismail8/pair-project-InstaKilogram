const { User, Profile, Post} = require('../models')

class Controllers {
  static profile(req, res){
    let {username} = req.params
    console.log(req.params);
    User.findAll({ where: {username},
      include: [Profile, {
        model: Post,
        order: [["postDate", "DESC"]]
      }]
    })
      .then((user) => {
        res.render("profilePage", {user})
      }).catch((err) => {
        res.send(err)
      });
  }
  static editProfile(req, res) {
    let {username} = req.params
    User.findOne({
      where: {username},
      include: Profile
    })
      .then((profile) => {
        res.render("editProfile", {profile})
      }).catch((err) => {
        res.send(err)
      });
  }
  static editProfileSubmit(req, res) {
    const {username} = req.params
    const {fullName, gender, birthDate, bio, profileImage} = req.body
    User.findOne({where : {username}})
      .then((user) => {
          return Profile.update({fullName, gender, birthDate, bio, profileImage}, {
            where: {
              UserId: user.id
            }
          })
      })
      .then(() => {
          res.redirect(`/${username}`)
      })
      .catch((err) => {
          res.send(err)
      });
  }
  static deletePost(req, res) {
    let {id} = req.params
    Post.destroy({
      where: {id}
    })
      .then(x => {
        res.redirect("/")
      })
      .catch(err => {
        res.send(err)
      })
  }
  static addProfile(req, res){
    let {username} = req.params
    res.render("addPostForm", {username})
  }
  static addProfileSubmit(req, res){
    let {username} = req.params
    let {caption, postImage} = req.body
    User.findOne({where : {username}})
      .then((user) => {
          return Post.create({caption, postImage, UserId: user.id})
      })
      .then(() => {
          res.redirect(`/${username}`)
      })
      .catch((err) => {
          res.send(err)
      });
  }
}

module.exports = Controllers