import axios from "axios";


export const createTrans = (transaction) => {
    return axios.get(`/api/transactions/`, transaction);
};