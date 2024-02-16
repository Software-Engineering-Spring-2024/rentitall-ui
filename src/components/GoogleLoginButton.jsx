import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export const GoogleLoginButton = () => {
    const navigate = useNavigate()
    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                const tokenDecoded = jwtDecode(credentialResponse.credential)
                console.log(tokenDecoded)
                const userDetails = {
                    email : tokenDecoded.email,
                    fullName : tokenDecoded.name,
                    givenName : tokenDecoded.given_name,
                    familyName : tokenDecoded.family_name,
                    picture : tokenDecoded.picture
                }
                const google_oauth_response = await axios.post(process.env.REACT_APP_LOGIN_SERVICE+"/google-auth", userDetails,
                {headers:
                        {
                            "Content-Type": "application/json"
                        }
                });
                console.log("google_oauth_response", google_oauth_response)
                return google_oauth_response.status === 200 && navigate('/home')
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
};