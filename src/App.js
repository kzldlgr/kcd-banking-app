import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Body from "./components/Body/body";
import Head from "./components/Head/Header"
import Login from "./components/LoginPage/Login"
import Home from './components/Body/Pages/Home';
import Deposit from './components/Body/Pages/Deposit';
import Transaction from './components/Body/Pages/Transaction';
import Withdraw from './components/Body/Pages/Withdraw';
import Transfer from './components/Body/Pages/Transfer';
import Notfound from './components/Body/Pages/Pagenotfound';
import { LoginContext } from './helper/context';

function App() {
const [loggedIn, setLoggedIn] = useState([JSON.parse(localStorage.getItem('users'))])

  return (
    <>
    <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
      <Head />
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Bankerfrostmain' element={<Body/>}>
          <Route path='Home' element={<Home/>}/>
          <Route path='Transaction' element={<Transaction/>}/>
          <Route path='Withdraw' element={<Withdraw/>}/>
          <Route path='Deposit' element={<Deposit/>}/>
          <Route path='Transfer' element={<Transfer/>}/>
        </Route>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </LoginContext.Provider>
    </>
  );
}

export default App;