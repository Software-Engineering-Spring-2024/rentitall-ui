import {useCallback, useState} from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";

export const SignupPage = () => {
    const navigate = useNavigate();
    const [signupDetails,setSignupDetails] = useState(
        {'username':'','firstName':'','lastName':'','email':'','mobile':'','password':'','address':'','zipCode':''})
    const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
    const [displayErrorBanner,setDisplayErrorBanner] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure the name and value from the event target
        setSignupDetails({
            ...signupDetails, // Spread the current formData
            [name]: value // Update the value of the specific field
        });
        console.log(signupDetails);
    };

    const handleSignupError = (data) => {
        setDisplayErrorBanner(data);

    }

    const signup = useCallback(
        async (e) => {
        e.preventDefault();
        const response = await axios.post( process.env.REACT_APP_LOGIN_SERVICE+"/signup",signupDetails,
            {headers:
                    {
                        "Content-Type": "application/json"
                    }
            });
        console.log(response);

        response.status === 200 ? navigate('/login') : handleSignupError(response.data);
    }, [signupDetails]);
    return (
        <div className="flex min-h-full flex-1 flex-col justify-self-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm basis-1">
                <img
                    className="mx-auto h-28 w-auto content-brandLogo"
                    alt="Your Company"
                />
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create New Account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={signup}>
                    <div>
                        <label className="block text-sm font-medium text-left leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={signupDetails.username}
                                placeholder="Enter Your Username"
                                required
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-left leading-6 text-gray-900">
                            First Name
                        </label>
                        <div className="">
                            <input
                                id="firstname"
                                name="firstName"
                                type="text"
                                value={signupDetails.firstName}
                                placeholder="Enter Your First Name"
                                required
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-left leading-6 text-gray-900">
                            Last Name
                        </label>
                        <div className="">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={signupDetails.lastName}
                                placeholder="Enter Your Last Name"
                                required
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-left leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={signupDetails.email}
                                autoComplete="email"
                                placeholder="Enter Your Email"
                                required
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-left leading-6 text-gray-900">
                            Mobile Number
                        </label>
                        <div className="">
                            <input
                                id="mobile"
                                name="mobile"
                                type="tel"
                                value={signupDetails.mobile}
                                placeholder="Enter Your Mobile Number"
                                required
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-left leading-6 text-gray-900">
                            Address
                        </label>
                        <div className="">
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={signupDetails.address}
                                placeholder="Enter Your Address"
                                required
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-left leading-6 text-gray-900">
                            Zip Code
                        </label>
                        <div className="">
                            <input
                                id="zipCode"
                                name="zipCode"
                                type="number"
                                value={signupDetails.zipCode}
                                placeholder="Enter Your Zip Code"
                                required
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password"
                               className="block text-left text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={signupDetails.password}
                                onChange={handleChange}
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
                            Sign Up
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}