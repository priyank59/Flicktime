import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

import React, { useState, useEffect }  from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import { Outlet } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      {isLoggedIn && <NavigationBar />}
      <Outlet />
      {isLoggedIn && <Footer />}
    </React.Fragment>
  );

}

export default App;



// import { RegistrationForm} from './components/RegistrationForm';
// import { Login} from './components/Login';
// import { ForgotPassword } from './components/ForgotPassword';
// import { ChangePassword} from './components/ChangePassword';
// import { Home} from './components/Home';
// import { PaymentPlan} from './components/PaymentPlan';
// import { BrowserRouter, Routes, Route } from 'react-router-dom'



// function App() {
//   return (
//     <>
//    <BrowserRouter>
//           <div>
//             <Routes>
//                 <Route exact path="/" element={<RegistrationForm/>} />
//                 <Route path='/PaymentPlan' element={<PaymentPlan/>}/>                
//                 <Route path='/RegistrationForm' element={<RegistrationForm/>}/>
//                 <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
//                 <Route path='/ChangePassword' element={<ChangePassword/>}/>
//                 <Route path='/Home' element={<Home/>}/>
//             </Routes>
//           </div>
//         </BrowserRouter>
//         </>
//   );
// }