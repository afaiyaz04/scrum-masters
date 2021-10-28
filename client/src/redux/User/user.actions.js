import { SET_USER, SIGN_OUT, UPDATE_USER } from "./user.types";
import * as api from "../api/index";

export const setUser = (formData, router) => async (dispatch) => {
    try {
        localStorage.setItem("token", JSON.stringify(formData.token));
        const { data } = await api.setUser(formData);
        dispatch({ type: SET_USER, data });
        router.push("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const switchUser = (toUserId, router) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(toUserId);
        localStorage.setItem("original", localStorage.getItem("user"));
        dispatch({ type: SET_USER, data });
        router.push("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const revertUser = (router) => async (dispatch) => {
    const data = { ...JSON.parse(localStorage.getItem("original")) };
    localStorage.setItem("user", localStorage.getItem("original"));
    localStorage.removeItem("original");
    dispatch({ type: SET_USER, data });
    router.push("/dashboard");
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
        router.push("/");
        await api.deleteUser(userId);
        dispatch({ type: SIGN_OUT });
    } catch (error) {
        console.log(error);
    }
};
