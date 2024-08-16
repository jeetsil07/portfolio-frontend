import React from 'react';
import Navbar from './components/header/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Footer from './components/footer/Footer';
import Post from './pages/Post';
import routes from './util/routes';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to={routes.home} />} />
          <Route index path={routes.home} element={<Home/>}/>
          <Route path={routes.about} element={<About/>}/>
          <Route path={routes.blogs} element={<Blogs/>}/>
          <Route path={routes.contact} element={<Contact/>}/>
          <Route path={routes.login} element={<Login/>}/>
          <Route path={routes.profile} element={<MyProfile/>}/>
          <Route path={routes.post} element={<Post/>}/>
          <Route path={routes.notfound} element={<NotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
