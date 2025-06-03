import axios from "axios";


const axiosInstance=axios.create({
    // baseURL:"http://127.0.0.1:5001/clone-134c1/us-central1/api"
    baseURL:"https://amazon-backend-c3xd.onrender.com/"
})


export default axiosInstance;