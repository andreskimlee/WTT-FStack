import axios from "axios";


export const createTrans = (transaction) => {
    return axios.post(`/api/transactions`, transaction);
};