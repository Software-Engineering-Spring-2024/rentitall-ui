import { useCallback } from 'react';
import {Navigate, useNavigate} from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();
    const goToLoginPage = useCallback(() => {
        navigate('/login')
    })

    return (
        <div className="Navbar px-4 py-2 flex justify-between bg-white">
            <div></div>
            <button
                onClick={goToLoginPage}
                className="flex justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Sign in
            </button>
        </div>
    )
}