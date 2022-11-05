import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Body from "./components/body/body";
import Head from "./components/Head/Header"
import Login from "./components/LoginPage/Login"
import Deposit from './components/body/Pages/Deposit/Deposit';
import Transfer from "./components/body/Pages/Transfer/Transfer";
import Transaction from './components/body/Pages/Transaction/Transaction';
import Withdraw from './components/body/Pages/Withdraw/Withdraw';
import Notfound from './components/body/Pages/Pagenotfound';
import AddClient from './components/body/Pages/AddClient/AddClient'
import SignUp from "./components/SignUp/SignUp";
import { UsersContextProvider } from './context/UsersContext';
import { UserBalanceContextProvider } from "./context/UserBalance";
import ManageUser from "./components/body/Pages/ManageUser/ManageUser";


function App() {

  
  const [loggedUser, setLoggedUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  return (
    <UsersContextProvider>
      <UserBalanceContextProvider>
      <Head />
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        { loggedUser !== undefined ?
        <Route path='/Bankerostmain' element={<Body/>}>
          <Route path='Transaction' element={<Transaction/>}/>
          <Route path='Withdraw' element={<Withdraw/>}/>
          <Route path='Deposit' element={<Deposit/>}/>
          <Route path='Transfer' element={<Transfer/>}/>
          <Route path='AddClient' element={<AddClient/>}/>
          <Route path='ManageUser' element={<ManageUser/>}/>
        </Route>
        : []
        }
        <Route path='*' element={<Notfound/>}/>
      </Routes>
      </UserBalanceContextProvider>
    </UsersContextProvider>
  );
}

export default App;