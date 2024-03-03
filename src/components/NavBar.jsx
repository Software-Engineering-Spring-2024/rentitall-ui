import { useCallback } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './../styles/NavBar.css'

export const NavBar = (props) => {
    const navigate = useNavigate();
    const goToLoginPage = useCallback(() => {
        navigate('/login')
    })
    const goToHomePage = useCallback(() => {
        navigate('/')
    })

    return (
        <div className="NavBar">
            <div onClick = {goToHomePage}>
                <img
                    className="navbar-company-logo content-brandLogo"
                    alt="RentItAll"
                />
            </div>
            <div className="navbar-actions">
                <button onClick={props.handleProductListModal} className='secondary-button'>
                    List your item
                </button>
                <button
                    onClick={goToLoginPage}
                >
                    Sign in
                </button>
            </div>
        </div>
    )
}