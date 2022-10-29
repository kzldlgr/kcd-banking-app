import React from "react";
import { Routes, Route } from 'react-router-dom';
import Body from "./components/body/body";
import Head from "./components/Head/Header"
import Login from "./components/LoginPage/Login"
import Home from './components/body/Pages/Home';
import Deposit from './components/body/Pages/Deposit';
import Transaction from './components/body/Pages/Transaction/Transaction';
import Withdraw from './components/body/Pages/Withdraw';
import Transfer from './components/body/Pages/Transfer';
import Notfound from './components/body/Pages/Pagenotfound';
import { UsersContextProvider } from './context/UsersContext';

function App() {

  return (
    <UsersContextProvider>
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
    </UsersContextProvider>
  );
}

export default App;