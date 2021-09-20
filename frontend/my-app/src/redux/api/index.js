import axios from 'axios';

const url = 'http://localhost:5000';

export const createOrder = (newOrder) => axios.create(`${url}/order`, newOrder);