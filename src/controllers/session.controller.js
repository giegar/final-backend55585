import jwt from 'jsonwebtoken'
import * as UserRepository from "../repositories/users.repository.js"
import * as CartRepository from "../repositories/carts.repository.js"
import { createHash, validatePassword } from "../utils.js"
import { generateToken } from "../utils/jsonwebtoken.js"
import { sendEmail } from "../utils/nodemailer.js"
import { validateJWT } from "../middleware/auth.js"

export const register = async (req, res) => {
    try {
        req.body.password = createHash(req.body.password);

        const emailRegistered = await UserRepository.getUserEmail(req.body.email);
        if(emailRegistered) return res.status(400).json({ ok: false, msg: `The email ${req.body.email} is already registered` });

        const cart = await CartRepository.createCart();
        console.log(cart)
        req.body.cartId = cart.res._id;

        const user = await UserRepository.registerUser(req.body);

        const { _id, name, lastname, email, rol } = user;
        const token = generateToken({ _id, name, lastname, email, rol })

        //return res.redirect('/login')
        return res.json({ ok: true, user, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg: "An error occurred. Please contact our user support." })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserRepository.getUserEmail(email);

        if(!user) return res.status(400).json({ ok: false, msg: `The email ${req.body.email} is not registered in our database`});

        const validPassword = validatePassword(password, user.password);
        if(!validPassword) return res.status(400).json({ ok: false, msg: `Incorrect password`});

        const { _id, name, lastname, rol } = user;
        const token = generateToken({ _id, name, lastname, email, rol })

        //return res.redirect('/products')
        return res.json({ ok: true, msg: 'loginUser', user, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg: "An error occurred. Please contact our user support."})
    }
}
export const renewToken = async (req, res) => {
    try {
        
        const { _id, name, lastname, rol } = req;
        const token = generateToken({ _id, name, lastname, email, rol })

        return res.json({ ok: true, msg: 'renewed token', user, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg: "An error occurred. Please contact our user support."})
    }
}
export const recoverPassword = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await UserRepository.getUserEmail(email);
        if(!user) return res.status(400).json({ ok: false, msg: `The email ${req.body.email} is not registered in our database`});
        
        const token = generateToken({email}, '1h');
        const urlReset = `${process.env.RESET_PASS_URL}?token=${token}`;

        sendEmail(email, urlReset);

        return res.json({ ok: true, msg: 'Recover email sent' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg: "An error occurred. Please contact our user support."})
    }
}
export const tokenPassValidate = async (req, res) => {
    try {
        const { token } = req.query
        const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return res.json({ ok: true, msg: 'Password token validated', token, email })
    } catch (error) {
        return res.status(401).json({ ok: false, msg: "Expired token"})
    }
}
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        const user = await UserRepository.getUserEmail(email);
        if(!user) return res.status(400).json({ ok: false, msg: `The email ${req.body.email} is not registered in our database`});
        
        const validPassword = validatePassword(password, user.password)
        console.log(password, user.password)
        if(validPassword) return res.status(400).json({ ok: false, msg: `New password must be different from the previous one`});

        user.password = createHash(password);
        user.save();

        return res.json({ ok: true, msg: 'Password updated' })
    } catch (error) {
        return res.status(401).json({ ok: false, msg: "Expired token"})
    }
}