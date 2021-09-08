//对axios进行二次封装
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000"
export default axios