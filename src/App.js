import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import {RegistrationForm} from './components/registrationForm';
import {Login} from './components/login';
import { ForgotPassword } from './components/forgotPassword';
import {ChangePassword} from './components/changePassword';
import {Home} from './components/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
   <BrowserRouter>
          <div>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route path='/registrationForm' element={<RegistrationForm/>}/>
                <Route path='/forgotPassword' element={<ForgotPassword/>}/>
                <Route path='/changePassword' element={<ChangePassword/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>
          </div>
        </BrowserRouter>
        </>
  );
}


export default App;