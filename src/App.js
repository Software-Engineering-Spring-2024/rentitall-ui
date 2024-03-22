import './App.css';
import './variables.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./screens/login-page/LoginPage";
import { SignupPage } from "./screens/signup-page/SignupPage";
import { HomePage } from "./screens/home-page/HomePage";
import { ForgotPasswordPage } from "./screens/forgot-password/ForgotPasswordPage";
import { ResetPassword } from "./screens/reset-password/ResetPassword";
import { ProtectedRoute } from "./wrapper/ProtectedRoute";
import { createContext, useCallback, useState } from "react";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { ProductListModal } from './components/ProductListModal';
import { SessionProvider } from "./hooks/SessionContext";
import { AdminPanel } from "./screens/admin-panel/AdminPanel";
import { ManageProducts } from "./screens/manage-products/ManageProducts";
import { RentalItems } from './screens/rental-items';

const UserContext = createContext();
function App() {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = useCallback(() => {
        setShowModal(prev => !prev)
    }, []);

    return (
        <SessionProvider>
            <Router>
                <div className="App">
                    <div className='routes'>
                        <NavBar handleProductListModal={toggleModal} />
                        <Routes>
                            <Route exact path='/' element={<Navigate to='/home' />} />
                            <Route exact path='/login' element={<LoginPage />} />
                            <Route exact path='/signup' element={<SignupPage />} />
                            <Route exact path='/home' element={<HomePage handleProductListModal={toggleModal} />} />
                            <Route exact path='/forgot-password' element={<ForgotPasswordPage />} />
                            <Route exact path='/reset-password' element={
                                <ProtectedRoute><ResetPassword /></ProtectedRoute>
                            } />
                            {/*<Route exact path='/admin' element={*/}
                            {/*    <ProtectedRoute><AdminPanel /></ProtectedRoute>*/}
                            {/*} />*/}
                            <Route exact path='/admin' element={<AdminPanel />} />
                            <Route exact path='/manage-products' element={<ManageProducts />} />
                            <Route exact path='/rental-items' element={<RentalItems />} />
                        </Routes>
                        <Footer />
                        <ProductListModal show={showModal} closeModal={toggleModal} />
                    </div>
                </div>
            </Router>
        </SessionProvider>
    );
}

export default App;
