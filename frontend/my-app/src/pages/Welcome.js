import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Button } from 'antd'

import { SET_USER } from '../redux/User/user.types'
import { setUser } from '../redux/User/user.actions'

function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();

    const googleSuccess = async (res) => {
        const token = res.tokenId;
        const email = res.profileObj.email;
        const nameFirst = res.profileObj.givenName;
        const nameLast = res.profileObj.familyName;
        const password = 'pass';
        const type = 'ADMIN';

        try {
            dispatch({ type: SET_USER, data: { email, nameFirst, nameLast, password, type, token } });
            dispatch(setUser({ email, nameFirst, nameLast, password, type, token }, history));
        } catch (error) {
            console.log(error);
        }
    }

    const googleError = () => alert('Google Login was unsuccessful. Try again later');

    return (
        <div>
            <GoogleLogin
                clientId='1063167078209-5pq5omaa5so02ga8icoeqqdk1iql3hdl.apps.googleusercontent.com'
                render={(renderProps) => (
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy='single_host_origin'
            />
        </div>
    );
}

export default SignUp;
