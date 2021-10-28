import React from "react";
import "./Signout.css";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../../redux/User/user.types";

function Signout() {
    const history = useHistory();
    const dispatch = useDispatch();

    const signout = () => {
        dispatch({ type: SIGN_OUT });
        history.push("/");
    };

    return (
        <button className="signout-btn" onClick={signout}>
            Sign Out
        </button>
    );
}

export default withRouter(Signout);
