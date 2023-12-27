import axios from "axios";

const userAxiosInstance=axios.create({
    baseURL:'http://localhost:5000/api/users',
    headers:{
        'Content-Type':'application/json'
    },


})


userAxiosInstance.interceptors.request.use(
    async(config)=>{
        const userInfo=localStorage.getItem('userInfo')

        const parsedUserInfo=JSON.parse(userInfo)
        const token=parsedUserInfo.userToken
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default userAxiosInstance