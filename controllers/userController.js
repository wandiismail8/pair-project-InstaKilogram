const { User } = require('../models')

class userController {
    static registerForm(req, res){
        res.render('registerForm')
    }

    static postRegister(req, res){
        const {username, email, password, phone, role} = req.body
        User.create({username, email, password, phone, role})
        .then((result) => {
            res.send('Done')
        }).catch((err) => {
            res.send(err)
        });
    }

}

module.exports = userController