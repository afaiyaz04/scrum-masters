import React, { useState } from "react";
import "./Signout.css";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../../redux/User/user.types";

function Signout() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const signout = () => {
    dispatch({ type: SIGN_OUT });
    history.push("/");
    setUser(null);
    setUserData(null);
  };

  return (
    <button className="signout-btn" onClick={signout}>
      Sign Out
    </button>
  );
}

export default withRouter(Signout);
