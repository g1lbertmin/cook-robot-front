import axios from "axios";
const API_BASE_URL = "http://localhost:8888";

export const getDishes = () => {
    return axios.get(`${API_BASE_URL}/dishes/?page_size=10&page_index=0`)
}


