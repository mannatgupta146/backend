import axios from "axios"

export let axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
    /* withCredentials: true */
})

/* axiosInstance.interceptors.request.use() */

/* axiosInstance.interceptors.response.use(
    (res) => {
        console.log("axios instance response ", res)
        return res
    },
    async (error) => {
        console.log("error in instance", error)

        if(error?.response?.status === 401){
            await axiosInstance.get("/get-accessToken")
        }
    }
) */