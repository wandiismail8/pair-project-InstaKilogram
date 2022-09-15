const { User } = require('../models')
const bcrypt = require('bcryptjs')

class userController {
    static registerForm(req, res){
        const {errors} = req.query
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
            res.redirect('/login')
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
                    req.session.userId = user.id
                    return res.redirect(`/`)
                } else {
                    const errors = "Invalid username/password"
                    return res.redirect(`/login?errors=${errors}`)
                }
            }else{
                const errors = "Invalid username/password"
                return res.redirect(`/login?errors=${errors}`)
            }
            
        }).catch((err) => {
            res.send(err)
            
        });
    }

    static home(req, res){
        res.render('homePage')
    }

}

module.exports = userController