import { validationResult } from "express-validator";
import config from "../config/config.js";
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    if (req.session?.user)
        return next();

    return res.redirect('/login')
}

export const admin = (req, res, next) => {
    if (!(req.rol === 'admin' || req.rol === 'premium'))
        return res.status(403).json({ ok: "false", msg: 'You need higher permissions to access this feature' })
    
    return next();
}

export const validateField = (req, res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty()) {
        return res.status(400).json(error);
    }

    next();
}

export const validateJWT = (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ ok: false, msg: 'Non-existent JWT token. Log in or contact user support' })

    try{
        const { _id, email, rol, name, lastname} = jwt.verify(token, config.JWT_SECRET_KEY);
        req._id = _id;
        req.email = email;
        req.rol = rol;
        req.name = name;
        req.lastname = lastname;

    } catch(error){
        return res.status(401).json({ ok: false, msg: 'Invalid token'})
    }

    next()
}