import {Link, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import validator from "validator";
import axios from "axios";
export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [verificationCode,setVerificationCode] = useState('');
    const [regenerate,setRegenerate] = useState(false);
    const [displayMessage,setDisplayMessage] = useState('');
    const [startTimer,setStartTimer] = useState(false);
    const [timer, setTimer] = useState(60);
    const [displayMessageColor,setDisplayMessageColor] = useState('');
    const [generatedOtp,setGeneratedOtp] = useState('');
    useEffect(() => {
        let interval = null;
        if (startTimer) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000); // Update every second
        } else if (!startTimer && timer !== 60) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [startTimer, timer]);

    function sentSuccess(response){
        setDisplayMessageColor('text-dark-green');
        setGeneratedOtp(response.data.otp);
    }
    const handleResponse = (response) => {
        console.log(response);
        response.status === 200 ? sentSuccess(response) : setDisplayMessageColor('text-red');
        setDisplayMessage(response.data.message);
        console.log(displayMessage);
        setRegenerateTimer();
    }
    const setRegenerateTimer = () => {
        setStartTimer(true);
        setTimeout(() => {
            setStartTimer(false);
        },60000)
    }

    const sendCodeToEmail = useCallback(
        async (e) => {
            setStartTimer(false);
            setTimer(60);
            e.preventDefault();
            if (email !== '' && validator.isEmail(email)) {
                const response = await axios.post(process.env.REACT_APP_LOGIN_SERVICE + '/sendOtp',{'email': email},{headers:
                        {
                            "Content-Type": "application/json"
                        }
                });
                handleResponse(response);
            }
            else{
                setDisplayMessageColor('text-red');
                setDisplayMessage("Enter a Valid Email Address..");
            }
        },
        [email],
    );
    const verifyCode = (e) => {
        e.preventDefault();
        const enteredOtp = e.target.value;
        enteredOtp === generatedOtp ? navigate('/reset-password'): setDisplayMessageColor('text-red');
        setDisplayMessage('Enter a Valid Verification Code');
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-self-center px-6 py-28 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm basis-1">
                <img
                    className="mx-auto h-28 w-auto content-brandLogo"
                    alt="Your Company"
                />
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Forgot Your Password?
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={verifyCode}>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="email"
                                   className="block text-sm font-medium text-left leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="text-sm">
                                <a href='#' onClick={sendCodeToEmail}
                                   className={"text-blue-700 hover:text-blue-500 underline font-bold "+ (startTimer? 'pointer-events-none opacity-50' : '')}>
                                    Generate OTP
                                </a>
                                <>{startTimer && <span className="text-sm font-normal">  :{timer}S</span>}</>
                            </div>
                        </div>
                        <div className="">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                autoComplete="email"
                                placeholder="Enter Your Email"
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <>{displayMessage!=='' && <div className={"text-left"} style={{marginTop:0}}><label className={"text-xs font-normal "+(displayMessageColor)}>{displayMessage}</label></div> }</>
                    <div className="text-left">
                        <label htmlFor="verificationCode" className="block text-sm text-left font-medium leading-6 text-gray-900">
                            Verification Code
                        </label>
                        <div className="">
                            <input
                                id="verificationCode"
                                name="verificationCode"
                                type="text"
                                value={verificationCode}
                                onChange={(e) => {
                                    setVerificationCode(e.target.value);
                                }}
                                placeholder="Enter Confirmation Code"
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
                            Verify Code
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}