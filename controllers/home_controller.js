const User = require('../models/user_details');

module.exports.home = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('home');
}

module.exports.createUser = async function(req, res){
    // console.log(req.body);
    // User.create({
    //     name: req.body.name,
    //     password: req.body.password
    // }, function(err, newUser){
    //     if(err){
    //         console.log(`Error in creating a new user: ${err}`);
    //         return;
    //     }
    //     return res.redirect('back');
    // })

    try{
        if(req.body.password != req.body.passwordAgain){
            return res.redirect('back');
        }
        let user = await(User.findOne({email: req.body.email}));
        if(user){
            return res.redirect('/login');
        }else{
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            return res.redirect('/login');
        }
    } catch(err){
        console.log(`Error in creating a new user: ${err}`);
        return;
    }
}

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('login.ejs');
}

module.exports.userHome = function(req, res){
    return res.render('homepage.ejs');
}

module.exports.createSession = function(req, res){
    return res.redirect('/home');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){});
    return res.redirect('/');
}