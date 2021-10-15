import { SET_USER_DATA, SIGN_OUT, UPDATE_USER } from "./user.types";
import * as api from "../api/index";

export const setUser = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.setUser(formData);
        dispatch({ type: SET_USER_DATA, data });
        router.push("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const fetchUser = (userId) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(userId);
        dispatch({ type: SET_USER_DATA, data });
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (userId, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(userId, formData);
        dispatch({ type: UPDATE_USER, data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = (userId) => async () => {
    try {
        await api.deleteUser(userId);
    } catch (error) {
        console.log(error);
    }
};

export const deleteSelf = (userId, router) => async (dispatch) => {
    try {
        await api.deleteUser(userId);
        dispatch({ type: SIGN_OUT });
        router.push("/");
    } catch (error) {
        console.log(error);
    }
};
