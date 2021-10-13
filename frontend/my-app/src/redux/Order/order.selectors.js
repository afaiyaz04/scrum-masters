import { createSelector } from "reselect";

const orderSelector = (state) => {
    if (state) {
        return state.orderState;
    }
};

export const getOrders = createSelector(orderSelector, (orders) => orders);
