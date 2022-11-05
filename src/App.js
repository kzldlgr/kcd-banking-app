import React, { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Body from "./components/Body/body";
import Head from "./components/Head/Header"
import Login from "./components/LoginPage/Login"
import Deposit from './components/Body/Pages/Deposit/Deposit';
import Transfer from "./components/Body/Pages/Transfer/Transfer";
import Transaction from './components/Body/Pages/Transaction/Transaction';
import Withdraw from './components/Body/Pages/Withdraw/Withdraw';
import AddClient from './components/Body/Pages/AddClient/AddClient'
import SignUp from "./components/SignUp/SignUp";
import { UsersContextProvider } from './context/UsersContext';
import ManageUser from "./components/Body/Pages/ManageUser/ManageUser";
import Expenses from "./components/Body/Pages/Expenses/Expenseschart";
import Search from "./components/Body/Pages/Searchpage/Search";

function App() {

  const [loggedUser, setLoggedUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  return (
    <UsersContextProvider>
      <Head />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        {loggedUser !== undefined || loggedUser.userype !== 'admin' ?
          <Route path='/Bankerostmain' element={<Body />}>
            <Route path='Transaction' element={<Transaction />} />
            <Route path='Withdraw' element={<Withdraw />} />
            <Route path='Deposit' element={<Deposit />} />
            <Route path='Transfer' element={<Transfer />} />
            <Route path='AddClient' element={<AddClient />} />
            <Route path='Expenses' element={<Expenses />} />
            <Route path='ManageUser' element={<ManageUser />} />
            <Route path='Admin' element={<Search />} />
          </Route>
          :
          <Route path='/Bankerostmain' element={<Body />}>
            <Route path='Admin' element={<Search />} />
            <Route path='ManageUser' element={<ManageUser />} />
            <Route path='Withdraw' element={<Withdraw />} />
            <Route path='Deposit' element={<Deposit />} />
            <Route path='Transfer' element={<Transfer />} />
            <Route path='AddClient' element={<AddClient />} />
          </Route>
        }
        {/* <Route path='*' element={<Navigate to='/' replace={true} />} /> */}
      </Routes>
    </UsersContextProvider >
  );
}

export default App;