import axios from "axios";

const instance = axios.create({
    baseURL: "https://thangtdshop.onrender.com",
});
export default instance;
