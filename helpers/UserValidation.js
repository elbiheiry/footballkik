'use strict';

module.exports = function () {
	return {
		SignupValidation : (req ,res ,next) => {
			req.checkBody('username' , 'Username is required').notEmpty();
			req.checkBody('username' , 'Username must be more than 5').isLength({min : 5});

			req.checkBody('email' , 'Email is required').notEmpty();
			req.checkBody('email' , 'Email is Invalid').isEmail();

			req.checkBody('password' , 'Password is required').notEmpty();
			req.checkBody('password' , 'Password must be more than 5').isLength({min : 5});

			req.getValidationResult().then((result) => {
				const errors = result.array();
				const messages = [];

				errors.forEach((error) => {
					messages.push(error.msg);
				});

				req.flash('error' ,messages);

				req.redirect('/signup');
			})
			.catch((err)  => {
				return next();
			});
		},
		LoginValidation : (req ,res ,next) => {

			req.checkBody('email' , 'Email is required').notEmpty();
			req.checkBody('email' , 'Email is Invalid').isEmail();

			req.checkBody('password' , 'Password is required').notEmpty();
			req.checkBody('password' , 'Password must be more than 5').isLength({min : 5});

			req.getValidationResult().then((result) => {
				const errors = result.array();
				const messages = [];

				errors.forEach((error) => {
					messages.push(error.msg);
				});

				req.flash('error' ,messages);

				req.redirect('/');
			})
			.catch((err)  => {
				return next();
			});
		}
	};
};