import logo from './logo.svg';
import './App.css';
import './variables.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {LoginPage} from "./screens/login-page/LoginPage";
import {SignupPage} from "./screens/signup-page/SignupPage";
import {HomePage} from "./screens/home-page/HomePage";
import {ForgotPasswordPage} from "./screens/forgot-password/ForgotPasswordPage";
import {ResetPassword} from "./screens/reset-password/ResetPassword";
import {ProtectedRoute} from "./wrapper/ProtectedRoute";
import {createContext} from "react";
import { NavBar } from "./components/NavBar";

const UserContext = createContext();
function App() {
  return (
      <Router>
          <div className="App">
              <div className='routes'>
                  <NavBar />
                  <Routes>
                      <Route exact path='/' element={<Navigate to='/home'/>}/>
                      <Route exact path='/login' element={<LoginPage/>}/>
                      <Route exact path='/signup' element={<SignupPage/>}/>
                      <Route exact path='/home' element={<HomePage/>}/>
                      <Route exact path='/forgot-password' element={<ForgotPasswordPage/>} />
                      <Route exact path='/reset-password' element={
                          <ProtectedRoute><ResetPassword /></ProtectedRoute>
                      } />
                  </Routes>
              </div>

          </div>
      </Router>

  );
}

export default App;
