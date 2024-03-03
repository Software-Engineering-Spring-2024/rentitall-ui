import { useCallback } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './../styles/NavBar.css'
import { useUser } from '../hooks/UserContext';

export const NavBar = (props) => {
    const navigate = useNavigate();
    const { loginData, logOutUser } = useUser();
    const goToLoginPage = useCallback(() => {
        navigate('/login')
    })
    const goToHomePage = useCallback(() => {
        navigate('/')
    })
    const handleLogout = useCallback(async() => {
        await logOutUser()
        goToHomePage()
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
                {
                    loginData.isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={goToLoginPage}
                        >
                            Sign In
                        </button>
                    )
                }
            </div>
        </div>
    )
}