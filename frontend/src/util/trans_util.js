import axios from "axios";


export const createTrans = (transaction) => {
    return axios.post(`/api/transactions`, transaction);
};

export const fetchAllTrans = (userId) => {
    return axios.get(`/api/transactions/${userId}`)
}