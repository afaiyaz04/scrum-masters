import {
    FETCH_CONTACTS,
    CREATE_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    FAVOURITE_CONTACT,
} from "./contact.types";
import * as api from "../../redux/api/index";

export const fetchContacts = (userId) => async (dispatch) => {
    try {
        const { data } = await api.fetchClients(userId);
        dispatch({ type: FETCH_CONTACTS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createContact = (userId, formData) => async (dispatch) => {
    try {
        const data = await api.createClient(formData);
        await api.addUserClient(userId, data.data._id);
        dispatch({ type: CREATE_CONTACT, payload: data.data });
    } catch (error) {
        console.log(error);
    }
};

export const updateContact = (clientId, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateClient(clientId, formData);
        dispatch({ type: UPDATE_CONTACT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteContact = (userId, clientId) => async (dispatch) => {
    try {
        await api.deleteUserClient(userId, clientId);
        dispatch({ type: DELETE_CONTACT, payload: clientId });
    } catch (error) {
        console.log(error);
    }
};

export const favouriteClient = (clientId, isFav) => async (dispatch) => {
    try {
        const { data } = await api.favouriteClient(clientId, isFav);
        dispatch({ type: FAVOURITE_CONTACT, payload: data });
    } catch (error) {
        console.log(error);
    }
};
