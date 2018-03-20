'use strict';

module.exports = function (_ ,passport ,UserValidation) {
    return {
        SetRouting : function (router) {
            router.get('/' , this.indexPage);
            router.post('/' , UserValidation.LoginValidation ,this.postLogin);
            router.get('/home' , this.homePage);
            router.get('/signup' ,this.getSignUp);
            router.post('/signup' , UserValidation.SignupValidation ,this.postSignUp);
        },

        indexPage : function (req , res) {
            const errors = req.flash('error');
            return res.render('index' ,{title : 'Footballkik Login' ,messages : errors, hasErrors : errors.length > 0});
        },
        getSignUp : function (req , res) {
            const errors = req.flash('error');
            return res.render('signUp' ,{title : 'Footballkik Signup' ,messages : errors, hasErrors : errors.length > 0});
        },
        postSignUp : passport.authenticate('local.signup' ,{
            successRedirect : '/home',
            failureReqirect : '/signup',
            failureFlash : true
        }),
        homePage : function (req , res) {
            return res.render('home');
        },
        postLogin : passport.authenticate('local.login' ,{
            successRedirect : '/home',
            failureReqirect : '/',
            failureFlash : true
        })
    }
};