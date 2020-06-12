import axios from 'axios'


const ajax = axios.create({
  baseURL: process.env.API_BASEURL,
  timeout: 5000
})

ajax.interceptors.request.use(
  (config) => {

    let token = null

    if (localStorage.getItem("SignOnByNTS") !== null) {
      let obj = JSON.parse(localStorage.getItem("SignOnByNTS"));
      token = obj.token
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`
    }

    return config
  },

)

export default ajax
