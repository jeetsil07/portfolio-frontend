import React, { Suspense, useEffect } from 'react';
import Navbar from './components/header/Navbar';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/footer/Footer';
import routes from './util/routes';
import Home from './pages/Home';
import Team from './pages/Team';
import Blogs from './pages/Blogs';
import { Login } from '@mui/icons-material';
import MyProfile from './pages/MyProfile';
import Post from './pages/Post';
import NotFound from './pages/NotFound';

// Lazy load the components
// const LoadableHome = React.lazy(() => import(/* webpackChunkName: "HomePage" */ './pages/Home'));
// const LoadableAbout = React.lazy(() => import(/* webpackChunkName: "AboutPage" */ './pages/About'));
// const LoadableTeam = React.lazy(() => import(/* webpackChunkName: "TeamPage" */ './pages/Team'));
// const LoadableBlogs = React.lazy(() => import(/* webpackChunkName: "BlogsPage" */ './pages/Blogs'));
// const LoadablePost = React.lazy(() => import(/* webpackChunkName: "PostPage" */ './pages/Post'));
// const LoadableContact = React.lazy(() => import(/* webpackChunkName: "ContactPage" */ './pages/Contact'));
// const LoadableLogin = React.lazy(() => import(/* webpackChunkName: "LoginPage" */ './pages/Login'));
// const LoadableMyProfile = React.lazy(() => import(/* webpackChunkName: "MyProfilePage" */ './pages/MyProfile'));
// const LoadableNotFound = React.lazy(() => import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFound'));

// Fallback component to show while lazy-loaded components are being fetched
const LoadComponent = () => <h3>Loading...</h3>;

function App() {
  // useEffect(() => {
  //   // Disable right-click context menu
  //   const handleContextMenu = (e: { preventDefault: () => void; }) => {
  //     e.preventDefault();
  //   };

  //   document.addEventListener('contextmenu', handleContextMenu);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to={routes.home} />} />
          <Route index path={routes.home} element={<Home />} />
          <Route path={routes.team} element={<Team />} />
          <Route path={routes.blogs} element={<Blogs />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.profile} element={<MyProfile />} />
          <Route path={routes.post} element={<Post />} />
          <Route path={routes.notfound} element={<NotFound />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
