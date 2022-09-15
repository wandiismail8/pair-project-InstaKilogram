const { User, Profile, Post } = require('../models')
const bcrypt = require('bcryptjs');
const mailer = require('../helpers/nodemailer');
const { Op } = require('sequelize');

class userController {
    static home(req, res){
        let {search} = req.query
        let option = {
            include: {
                model: User
            },
            order: [["postDate", "DESC"]],
        }
        if(search){
            option.include.where = {
                'username': {
                    [Op.iLike]: `%${search}%`
                }
            }
        }
        let user 
        Post.findAll(option)
        .then(users => {
            // console.log(users);
            user = users
            return User.findOne({
                where: {id: req.session.user.id}
            })
            
        })
        .then(profile => {
            res.render("homePage", {user, profile})
        })
        .catch((err) => {
            res.send(err)
        });
    }

    static registerForm(req, res){
        const {errors} =req.query
        res.render('registerForm', {errors})
    }
    static loginForm(req, res){
        const {errors} =req.query
        res.render('loginForm', {errors})
    }

    static postRegister(req, res){
        const {username, email, password, phone, role} = req.body
        User.create({username, email, password, phone, role})
        .then(() => {
            mailer(email)
            res.redirect(`/register/${username}`)
        }).catch((err) => {
            if(err.name === "SequelizeValidationError"){
                let errors = err.errors.map(el => {
                    return el.message 
                })
                // console.log(errors);
                res.redirect(`/register?errors=${errors}`)
            }else {
                res.send(err)

            }
        });
    }

    static postLogin(req, res){
        const {username, password} = req.body
        User.findOne({ where : { username } })
        .then((user) => {
            if(user){
                const isValidPassword = bcrypt.compareSync(password, user.password)
                // console.log(isValidPassword);
                if(isValidPassword){
                    req.session.user = {id: user.id, username: user.username}
                    res.redirect('/')
                } else {
                    const errors = "Invalid username/password"
                    res.redirect(`/login?errors=${errors}`)
                }
            }else{
                const errors = "Invalid username/password"
                res.redirect(`/login?errors=${errors}`)
            }
            
        }).catch((err) => {
            res.redirect(`/register?errors=${errors}`)
            
        });
    }
    static profileForm(req, res){
        const {username} = req.params
        res.render('profileForm', {username})

    }

    static postProfile(req, res){
        const {username} = req.params
        const {fullName, gender, birthDate, bio, profileImage} = req.body
        User.findOne({where : {username}})
        .then((user) => {
            return Profile.create({fullName, gender, birthDate, bio, profileImage, UserId : user.id})
        })
        .then(() => {
            res.redirect('/login')
        })
        .catch((err) => {
            res.send(err)
        });
    }


    static logout(req,res){
        req.session.destroy(err=>{
          if(err){
            res.send(err)
          }else{
            res.redirect('/login')
          }
        })
    }

    
}

module.exports = userController