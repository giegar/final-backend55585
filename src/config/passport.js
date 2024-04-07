import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2"
import * as UsersRepository from "../repositories/users.repository.js"
import { createHash, generatePassword, validatePassword } from "../utils.js";
import config from "./config.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
     /* passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
            try{

                const { confirmPassword } = req.body;
                if(password !== confirmPassword) {
                    console.log('Passwords dont match');
                    return done(null, false);
                }

                const user = await UsersRepository.getUserEmail(username);
                if (user) {
                    console.log('Email is alredy registered');
                    return done(null, false);
                }

                req.body.password = createHash(password)
                const result = await UsersRepository.registerUser({...req.body})

                if(result) return done(null, result)
                return done(null, false)

            }catch(error){
                done(error)
            }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try{
            const user = await UsersRepository.getUserEmail(username);

            if(!user) {
                console.log('user not found')
                done(null, false);
            }

            if(!validatePassword(password, user.password)){
                console.log('Incorrect password')
                return done(null, false)
            }
    
            //const token = generateToken(user)
            //user.token = token
    
            return done(null, user)

        } catch(error){
            done(error)
        }
    })) */

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async(id, done) => {
        const user = await UsersRepository.getUserById(id);
        done(null, user);
    });

    passport.use('github', new GithubStrategy({
        clientID: `${config.GITHUB_CLIENT_ID}`,
        clientSecret: `${config.GITHUB_CLIENT_SECRET}`,
        callbackURL: `${config.GITHUB_CALLBACK_URL}`
    }, async (accessToken, refreshToken, profile, done) => {
        try{

            const email = profile._json.email;
            const user = await UsersRepository.getUserEmail(email);

            if(user) return done(null, user);

            const githubUser = {
                name: profile._json.name,
                email: profile._json.email,
                password: createHash(generatePassword()),
                avatar: profile._json.avatar_url,
                github: true,
            }
            console.log(githubUser)
            const result = await UsersRepository.registerUser({...githubUser});

            return done(null, result)
        }catch(error){
            done(error);
        }
    }))

}