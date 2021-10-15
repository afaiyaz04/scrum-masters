import { CREATE_ORDER } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const createOrder = (order) => async (dispatch) => {
    try {
        const { data } = await api.createOrder(order);

        dispatch({ type: CREATE_ORDER, payload: data });
    } catch (error) {
        console.log(error);
    }
};
