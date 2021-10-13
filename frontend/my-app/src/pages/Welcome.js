import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Carousel, Layout } from "antd";

import { SET_USER } from "../redux/User/user.types";
import { setUser } from "../redux/User/user.actions";
import React from "react";
import "./Welcome.css";
import { GoogleButton } from "react-google-button";
import styled from "styled-components";

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    background: grey;
  }
  > .slick-dots li.slick-active button {
    background: black;
  }
`;

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const googleSuccess = async (res) => {
    const token = res.tokenId;
    const email = res.profileObj.email;
    const nameFirst = res.profileObj.givenName;
    const nameLast = res.profileObj.familyName;
    const password = "pass";

    try {
      dispatch({
        type: SET_USER,
        data: { email, nameFirst, nameLast, password, token },
      });
      dispatch(
        setUser({ email, nameFirst, nameLast, password, token }, history)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    alert("Google Login was unsuccessful. Try again later");

  const contentStyle = {
    height: window.innerHeight - (64 + 70),
    color: "#696969",
    lineHeight: "160px",
    textAlign: "center",
    background: "#fff",
  };

  const { Header, Content, Footer } = Layout;

  return (
    <div className="welcome-page">
      <Layout>
        <Header style={{ backgroundColor: "#20639B" }}>
          {/* <div className='logo'/> */}
          <div>
            <h1 className="title">CRM</h1>
          </div>
          <div style={{ float: "right", transform: "translate(0, 7px)" }}>
            <GoogleLogin
              clientId="1063167078209-5pq5omaa5so02ga8icoeqqdk1iql3hdl.apps.googleusercontent.com"
              render={(renderProps) => (
                <GoogleButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Login with Google
                </GoogleButton>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </div>
        </Header>

        <Content>
          <div>
            <CarouselWrapper autoplay style={contentStyle}>
              <div>
                <h1>Screen 1</h1>
              </div>
              <div>
                <h1>Screen 2</h1>
              </div>
              <div>
                <h1>Screen 3</h1>
              </div>
              <div>
                <h1>Screen 4</h1>
              </div>
            </CarouselWrapper>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Created by Scrummasters</Footer>
      </Layout>
    </div>
  );
}

export default SignUp;
