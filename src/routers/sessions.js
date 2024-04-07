import { Router } from "express";
import { check } from  'express-validator'
import { validateField, validateJWT } from "../middleware/auth.js";
import { register, login, renewToken, recoverPassword, tokenPassValidate, resetPassword } from "../controllers/session.controller.js";

const SessionRouter = Router();

SessionRouter.post('/register', [
    check('name', 'A name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must have the following format: example@email.com').isEmail(),
    check('password', 'Password must contain at least 8 characters').isLength({min: 8}),
    check('password', 'A password is required').not().isEmpty(),
    validateField
], register, (req, res) => { res.redirect('/login')});

SessionRouter.post('/login', [
    check('email', 'The email must have the following format: example@email.com').isEmail(),
    check('email', 'The email is required').not().isEmpty(),
    check('password', 'A password is required').not().isEmpty(),
    validateField
], login);

SessionRouter.post('/renew', [ validateJWT ], renewToken);

SessionRouter.post('/recover-password', [
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must have the following format: example@email.com').isEmail(),
    validateField
], recoverPassword);

SessionRouter.get('/resetPassword', [
    check('token', 'token is required').not().isEmpty(),
    validateField
], tokenPassValidate);

SessionRouter.post('/resetPassword', [
    check('token', 'token is required').not().isEmpty(),
    check('password', 'Password must contain at least 8 characters').isLength({min: 8}),
    check('password', 'A password is required').not().isEmpty(),
    validateField
], resetPassword);

export default SessionRouter;