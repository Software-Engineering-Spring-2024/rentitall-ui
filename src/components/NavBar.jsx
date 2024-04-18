import { useCallback, useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import './../styles/NavBar.css'
import { useUser } from '../hooks/UserContext';
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export const NavBar = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { loginData, logOutUser, user } = useUser();
    const [searchInput, setSearchInput] = useState('')
    const [showProfileDropDown, setShowProfileDropDown] = useState(false)
    useEffect(() => {
        // console.log('searchInput', searchInput)
    }, [searchInput])
    const handleSearch = useCallback(async (e) => {
        e.preventDefault();
        console.log('search clicked!!!')
        // const searchProductsResponse = await axios.get(process.env.REACT_APP_PRODUCT_SERVICE + "/product-list", {
        //     params: {
        //         phrase: searchInput
        //     }
        // })
        // console.log(searchProductsResponse)
        if (location.pathname == '/results') {
            searchParams.set('phrase', searchInput)
        }
        navigate(`/results?phrase=${searchInput}`)
    })
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
    const handleAdminPanel = () => {
        navigate('/admin');
    }
    const handleManageProducts = () => {
        navigate('/manage-products')
    }

    const searchBarExcludedPaths = ['/login', '/forgot-password', '/signup']

    function handleManageAccount() {
        navigate('/manage-account')
    }

    return (
        <div className="NavBar">
            <div onClick={goToHomePage}>
                <img
                    className="navbar-company-logo content-brandLogo"
                    alt="RentItAll"
                />
            </div>
            <div className="navbar-actions">
                {
                    !searchBarExcludedPaths.includes(location.pathname) &&
                    (
                        <div className='search-bar-wrapper'>
                            <form className='search-bar-form' onSubmit={handleSearch}>
                                <div className='input-wrapper'>
                                    <input type="text" id="searchbar" name="searchbar" value={searchInput} placeholder="Search..." onChange={(e) => {
                                        setSearchInput(e.target.value)
                                    }} />
                                </div>
                                <button type="submit" className='search-submit'><SearchIcon color='white' /></button>
                            </form>
                        </div>
                    )
                }
                {
                    loginData.isLoggedIn && user && user.is_admin ? (
                        <button onClick={handleAdminPanel} className='secondary-button'>
                            Admin Panel
                        </button>
                    ) : (<></>)
                }
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
                                    <div className='each-action' onClick={handleManageAccount}>Your Account</div>
                                    <div className='each-action' onClick={handleManageProducts}>Manage Products</div>
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