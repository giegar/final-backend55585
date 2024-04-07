import { fileURLToPath } from "url"
import path from "path"
import { dirname } from "path"
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname;

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, userPassword) => bcrypt.compareSync(password, userPassword);

export function generatePassword() {
    let password = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        password += str.charAt(char)
    }
 
    return password;
}

export function generateCode() {
    let code = '';
    let str = '0123456789-';
 
    for (let i = 1; i <= 20; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        code += str.charAt(char)
    }
 
    return code;
}
