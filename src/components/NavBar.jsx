import { useCallback } from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import './../styles/NavBar.css'

export const NavBar = () => {
    const navigate = useNavigate();
    const goToLoginPage = useCallback(() => {
        navigate('/login')
    })

    return (
        <div className="NavBar">
            <div></div>
            <button
                onClick={goToLoginPage}
            >
                Sign in
            </button>
        </div>
    )
}