import {
    FETCH_REPORT
} from "./report.types";
import * as api from "../../redux/api/index";

export const generateReport = (userId) => async (dispatch) => {
    try {
        const { data } = await api.generateReport(userId);
        dispatch({type: FETCH_REPORT, payload: data});
    } catch (error) {
        console.log(error);
    }
}
