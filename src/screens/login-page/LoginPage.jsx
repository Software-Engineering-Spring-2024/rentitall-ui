import axios from "axios";
import {useCallback, useContext, useEffect, useState} from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {HomePage} from "../home-page/HomePage";
import { GoogleLoginButton } from "../../components/GoogleLoginButton";
import {BackArrowButton} from "../../components/BackArrowButton";
import { BsEyeFill,BsEyeSlashFill } from "react-icons/bs";
import {Alert} from "@mui/material";
import {FaHome} from "react-icons/fa";
import Constants from "../../Constants";
import {HomeButton} from "../../components/HomeButton";
import LoginDataContext from "../../hooks/LoginDataContext";
import {useUser} from "../../hooks/UserContext";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [loginDetails,setLoginDetails] = useState({'email':'','password':''});
    const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
    const [displayErrorBanner,setDisplayErrorBanner] = useState(false);
    const [displayMessage,setDisplayMessage] = useState('');
    const [showPassword,setShowPassword] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const {setLoginData} = useUser();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsLoading(false);
    //         navigate('/destination');
    //     }, 2000); // 2 seconds delay
    //
    //     return () => clearTimeout(timer);
    // }, [navigate]);
    // Handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure the name and value from the event target
        setLoginDetails({
            ...loginDetails, // Spread the current formData
            [name]: value // Update the value of the specific field
        });

    };
    const handleError = (flag,message) => {
        setDisplayErrorBanner(flag);
        setDisplayMessage(message);
    }
    const handleSuccessfulLogin = () => {
        const loginData = {isLoggedIn:true,email:loginDetails.email};
        setLoginData(loginData);
        navigate('/home');
    }
    const login = async (e) => {
        e.preventDefault();
        if (loginDetails.email !== '' && loginDetails.password !== '') {
            try {
                console.log(loginDetails);
                const response = await axios.post(process.env.REACT_APP_LOGIN_SERVICE + "/login", loginDetails,
                    {
                        headers:
                            {
                                "Content-Type": "application/json"
                            }
                    });
                console.log(response.data);
                console.log(response);
                return response.status === 200 ? handleSuccessfulLogin() : handleError(true, response.data.message);
            } catch (error) {
                console.log(error);
                if(error.response.status === 400){
                    handleError(true,error.response.data.message);
                }
            }

        } else {
            handleError(true,'Invalid Credentials');
        }
    };

    return (
        <div className="flex bg-white min-h-full flex-1 flex-col justify-self-center px-6 py-28 lg:px-8">
            <div className='container bg=gr'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm basis-1">
                    <div className='text-left'>
                        <HomeButton size='20' path='/home'/>
                    </div>
                    <img
                        className="mx-auto h-28 w-auto content-brandLogo"
                        alt="Your Company"
                    />
                    <div className='self-center'>
                        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                </div>
                {displayErrorBanner && <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-8">
                    <Alert severity="error" className='rounded-3xl'>
                        {displayMessage}
                    </Alert>
                </div>}

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={login}>
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium text-left leading-6 text-gray-900">
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
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                                invalid:border-red-600 valid:border-green-800 valid:ring-green-800
                                focus:invalid:border-red-600 focus:invalid:ring-red-600 focus:valid:border-green-800"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link to="/forgot-password"
                                          className="font-semibold text-blue-700 hover:text-blue-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {/*<div className="flex-3">*/}
                                <input
                                    id="password"
                                    name="password"
                                    pattern={Constants.PASSWORD_REGEX}
                                    type={showPassword ? "text" : "password"}
                                    value={loginDetails.password}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                    placeholder="Enter Your Password"
                                    autoComplete="current-password"
                                    required
                                    // onInput={setValidPassword(fa)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                     placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                                     invalid:border-red-600 valid:border-green-800 valid:ring-green-800
                                     focus:invalid:border-red-600 focus:invalid:ring-red-600 focus:valid:border-green-800"
                                />
                                {/*</div>*/}
                                <div>
                                    <a className='align-middle' onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}>
                                        {showPassword ? <BsEyeSlashFill size='24'/> : <BsEyeFill size='24'/>}
                                    </a>
                                </div>

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
                    <div className="flex items-center pt-2 gap-2">
                        <label className="text-xs font-medium leading-6 text-gray-900">Don't Have an Account?</label>
                        <div>
                            <Link className="font-semibold text-sm text-blue-700 hover:text-blue-500" to='/signup'>Sign
                                Up</Link>
                        </div>
                    </div>
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-black"></div>
                        <span className="flex-shrink mx-4 text-sm font-bold">OR</span>
                        <div className="flex-grow border-t border-black"></div>
                    </div>
                    <div>
                        <br></br>
                        <GoogleLoginButton/>
                    </div>
                </div>
            </div>

        </div>


    )
}