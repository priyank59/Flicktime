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