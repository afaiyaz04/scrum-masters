import { SET_CONTRACT, DELETE_CONTRACT } from "redux/Contract/contract.types";

export const setContract = (contract) => {
    return {
        type: SET_CONTRACT,
        payload: contract,
    };
};

export const deleteContact = () => {
    return {
        type: DELETE_CONTRACT,
    };
};
