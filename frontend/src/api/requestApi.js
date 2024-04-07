import ecommmerceApi from "./config"

export const loginUser = async(email, password) => {
    try {
        const {data} = await ecommmerceApi.post('/auth/login', {email, password})
        console.log(data)
    } catch(error) {
        console.log(error)
    }
}

export const registerUser = async(name, lastname, email, password) => {
    try {
        const {data} = await ecommmerceApi.post('/auth/register', {name, lastname, email, password})
        console.log(data)
    } catch(error) {
        console.log(error)
    }
}

export const validateToken = async() => {
    try {
        const {data} = await ecommmerceApi.post('/auth/renew')
        console.log(data)
    } catch(error) {
        console.log(error)
    }
}