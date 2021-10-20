import {
    FETCH_REPORT
} from "./report.types";
import * as api from "../../redux/api/index";

export const getReport = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getReport(userId);
        dispatch({type: FETCH_REPORT, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getAllReports = () => async (dispatch) => {
    try {
        const { data } = await api.getAllReports();
        dispatch({type: FETCH_REPORT, payload: data});
    } catch (error) {
        console.log(error);
    }
}
