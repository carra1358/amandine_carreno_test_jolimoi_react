import axios from "axios"

const api = axios.create({
    baseURL: "https://thawing-scrubland-03171.herokuapp.com/https://skincare-api.herokuapp.com"
})

export default api;