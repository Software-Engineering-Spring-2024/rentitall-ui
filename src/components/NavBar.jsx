import { useCallback, useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './../styles/NavBar.css'
import { useUser } from '../hooks/UserContext';
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const NavBar = (props) => {
    const navigate = useNavigate();
    const { loginData, logOutUser, user } = useUser();
    const [showProfileDropDown, setShowProfileDropDown] = useState(false)
    const toggleProfileDropdown = useCallback(() => {
        setShowProfileDropDown(!showProfileDropDown)
    })
    const goToLoginPage = useCallback(() => {
        navigate('/login')
    })
    const goToHomePage = useCallback(() => {
        navigate('/')
    })
    const handleLogout = useCallback(async () => {
        await logOutUser()
        goToHomePage()
    })

    return (
        <div className="NavBar">
            <div onClick={goToHomePage}>
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
                    loginData.isLoggedIn && user ? (
                        <div className='user-profile-wrapper' onClick={toggleProfileDropdown}>
                            <div className='user-profile'>
                                <div className='user-profile-name' title={user.firstName + ' ' + user.lastName}><CgProfile color='white' size='32' /> {user.firstName + ' ' + user.lastName}</div>
                                {
                                    showProfileDropDown ? <IoIosArrowUp color='white' /> :
                                        <IoIosArrowDown color='white' />
                                }
                            </div>
                            {showProfileDropDown &&
                                <div className='user-profile-dropdown'>
                                    <div className='each-action'>Your Account</div>
                                    {/* <div className='each-action'></div>
                                    <div className='each-action'></div> */}
                                    <div className='each-action'>
                                        <button
                                            onClick={handleLogout}
                                            className='sign-out-button'
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
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