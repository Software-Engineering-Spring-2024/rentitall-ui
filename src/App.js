import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {LoginPage} from "./screens/login-page/LoginPage";
import {SignupPage} from "./screens/signup-page/SignupPage";
import {HomePage} from "./screens/home-page/HomePage";
import {ForgotPasswordPage} from "./screens/forgot-password/ForgotPasswordPage";

function App() {
  return (
      <Router>
          <div className="App h-screen bg-slate-300">
              {/*<header className="App-header">*/}
              {/*    <img src={logo} className="App-logo" alt="logo"/>*/}
              {/*    <p>*/}
              {/*        Edit <code>src/App.js</code> and save to reload.*/}
              {/*    </p>*/}
              {/*    <a*/}
              {/*        className="App-link"*/}
              {/*        href="https://reactjs.org"*/}
              {/*        target="_blank"*/}
              {/*        rel="noopener noreferrer"*/}
              {/*    >*/}
              {/*        Learn React*/}
              {/*    </a>*/}
              {/*</header>*/}
              <div className='routes'>
                  <Routes>
                      <Route exact path='/' element={<Navigate to='/home'/>}/>
                      <Route exact path='/login' element={<LoginPage/>}/>
                      <Route exact path='/signup' element={<SignupPage/>}/>
                      <Route exact path='/home' element={<HomePage/>}/>
                      <Route exact path='/forgot-password' element={<ForgotPasswordPage/>} />
                  </Routes>
              </div>

          </div>
      </Router>

  );
}

export default App;
