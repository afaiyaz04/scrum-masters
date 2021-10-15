import { TRANSFER_RESPONSE, FETCH_TRANSFERS } from "./transfer.types";
import * as api from "../../redux/api/index";

export const fetchTransfers = (userId) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(userId);

        for (let i in data.receivedOrders) {
            const order = await api.fetchOrder(data.receivedOrders[i].order);
            const user = await api.fetchUser(data.receivedOrders[i].fromUser);
            dispatch({ type: FETCH_TRANSFERS, payload: { order: order.data, user: user.data } });
        }

    } catch (error) {
        console.log(error);
    }
};

export const acceptOrder = (userId, orderId) => async (dispatch) => {
    try {
        await api.acceptOrder(userId, orderId);
        dispatch({ type: TRANSFER_RESPONSE, payload: orderId });
    } catch (error) {
        console.log(error);
    }
};

export const declineOrder = (userId, orderId) => async (dispatch) => {
    try {
        await api.declineOrder(userId, orderId);
        dispatch({ type: TRANSFER_RESPONSE, payload: orderId });
    } catch (error) {
        console.log(error);
    }
};
