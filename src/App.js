import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Body from "./components/Body/body";
import Head from "./components/Head/Header"
import Login from "./components/LoginPage/Login"
import Deposit from './components/Body/Pages/Deposit/Deposit';
import Transfer from "./components/Body/Pages/Transfer/Transfer";
import Transaction from './components/Body/Pages/Transaction/Transaction';
import Withdraw from './components/Body/Pages/Withdraw/Withdraw';
import Notfound from './components/Body/Pages/Pagenotfound';
import { UsersContextProvider } from './context/UsersContext';
import { UserBalanceContextProvider } from "./context/UserBalance";

function App() {

  
  const [loggedUser, setLoggedUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  return (
    <UsersContextProvider>
      <UserBalanceContextProvider>
      <Head />
      <Routes>
        <Route path='/' element={<Login/>}/>
        { loggedUser !== undefined ?
        <Route path='/Bankerostmain' element={<Body/>}>
          <Route path='Transaction' element={<Transaction/>}/>
          <Route path='Withdraw' element={<Withdraw/>}/>
          <Route path='Deposit' element={<Deposit/>}/>
          <Route path='Transfer' element={<Transfer/>}/>
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