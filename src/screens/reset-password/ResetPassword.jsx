import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {SuccessPopup} from "../../components/SuccessPopup";
import {BsArrowLeftCircle} from "react-icons/bs";
import {BackArrowButton} from "../../components/BackArrowButton";

export const ResetPassword = () => {
    const state = useLocation();
    const email = state.state?.email;
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [successPopup,setSuccessPopup] = useState(false);

    async function proceedWithReset() {
        console.log(email);
        const response = await axios.post(process.env.REACT_APP_LOGIN_SERVICE + '/reset-password',
            {email:email,password:newPassword});
        response.status === 200 ? setSuccessPopup(true) : setErrorMessage(response.data.message);
    }

    const resetPassword = (e) => {
        e.preventDefault();
        newPassword === confirmPassword ? proceedWithReset() : setErrorMessage("Passwords don't match");
        
    };
    return (
        <div className="flex min-h-full flex-1 flex-col justify-self-center px-6 py-28 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm basis-1">
                <div className='text-left'><BackArrowButton path='/forgot-password'/></div>
                <img
                    className="mx-auto h-28 w-auto content-brandLogo"
                    alt="Your Company"
                />
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Reset Your Password Here
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={resetPassword}>
                    <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-left leading-6 text-gray-900">
                                Enter New Password
                            </label>
                        <div className="">
                            <input
                                id="passwword"
                                name="password"
                                type="password"
                                value={newPassword}
                                placeholder="Enter Password"
                                required
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/*<>{displayMessage !== '' && <div className={"text-left"} style={{marginTop: 0}}><label*/}
                    {/*    className={"text-xs font-normal " + (displayMessageColor)}>{displayMessage}</label></div>}</>*/}
                    <div className="text-left">
                        <label
                               className="block text-sm text-left font-medium leading-6 text-gray-900">
                            Confirm Your New Password
                        </label>
                        <div className="">
                            <input

                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                placeholder="Confirm Your Password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-sm text-left">{errorMessage}</div> // Display error message if present
                    )}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Reset Your Password
                        </button>
                    </div>
                </form>
            </div>
            {successPopup && <SuccessPopup message={"Password Changed"}/>}
        </div>
    )
}