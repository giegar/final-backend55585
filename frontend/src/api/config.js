import axios from "axios";

const ecommmerceApi = axios.create({
    baseURL:'https://ecommerceapi-v4fz.onrender.com/api'
})

ecommmerceApi.interceptors.request.use(config => {
    config.headers = {
        'Authorization': localStorage.getItem('token')
    }
    return config
})

export default ecommmerceApi