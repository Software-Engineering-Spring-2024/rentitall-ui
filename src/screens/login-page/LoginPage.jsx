import axios from "axios";
import {useCallback, useState} from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import {Navigate, useNavigate} from "react-router-dom";
import {HomePage} from "../home-page/HomePage";
import { GoogleLoginButton } from "../../components/GoogleLoginButton";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [loginDetails,setLoginDetails] = useState({'email':'','password':''});
    const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
    const [displayErrorBanner,setDisplayErrorBanner] = useState(false);
    // Handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure the name and value from the event target
        setLoginDetails({
            ...loginDetails, // Spread the current formData
            [name]: value // Update the value of the specific field
        });
    };
    const handleInputError = (flag) => {
        setDisplayErrorBanner(flag);

    }
    const login = useCallback(
         async (e) => {
            e.preventDefault();
            if (loginDetails.email !== '' && loginDetails.password !== '') {
                const response = await axios.post( process.env.REACT_APP_LOGIN_SERVICE+"/login",loginDetails,
                    {headers:
                            {
                                "Content-Type": "application/json"
                            }
                    });
                console.log(response.data);
                console.log(response);
                return response.status === 200 ? navigate('/home') : setDisplayErrorBanner(true);
            } else {
                handleInputError(true);
            }
        }, [loginDetails]);

    return (
        <div className="flex bg-white min-h-full flex-1 flex-col justify-self-center px-6 py-28 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm basis-1">
                    <img
                        className="mx-auto h-28 w-auto content-brandLogo"
                        alt="Your Company"
                    />
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={login}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-left leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={loginDetails.email}
                                    autoComplete="email"
                                    placeholder="Enter Your Email"
                                    required
                                    onChange={(e) => {handleChange(e)}}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-blue-700 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={loginDetails.password}
                                    onChange={(e) => {handleChange(e)}}
                                    placeholder="Enter Your Password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <br></br>
                    <GoogleLoginButton />
                </div>
        </div>
        

    )
}