import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { GoogleLogin } from 'react-google-login'

import { signin, signup } from '../../actions/auth'
import { AUTH } from '../../constants/actionTypes'
import { Button } from 'antd'

const initialState = { accessToken: '', email: '', nameFirst: '', nameLast: '', type: 'ADMIN_USER' }

const SignUp = () => {
    const [form, setForm] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const switchMode = () => {
        setForm(initialState);
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signup(form, history));
        } else {
            dispatch(signin(form, history));
        }
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div>
            <GoogleLogin
                clientId='1063167078209-5pq5omaa5so02ga8icoeqqdk1iql3hdl.apps.googleusercontent.com'
                render={(renderProps) => (
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Google sign-in</Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy='single_host_origin'
            />
        </div>
    );
}

export default SignUp;