import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import ErrorPage from './ErrorPage';
import List from './List';
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup';
import Mypage from './Pages/Mypage/Mypage';
import Posts from './Posts';
import './App.css';
import WritePage from './WritePage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<List />}></Route>
          <Route path='posts/:id' element={<Posts />}></Route>
          <Route path='users/login' element={<Login />}></Route>
          <Route path='users/signup' element={<Signup />}></Route>
          <Route path='users/mypage' element={<Mypage />}></Route>
          <Route path='users/writepage' element={<WritePage />}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
