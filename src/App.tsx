import React, { Suspense, useEffect } from 'react';
import Navbar from './components/header/Navbar';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/footer/Footer';
import routes from './util/routes';

// Define the fallback component
const LoadComponent: React.FC = () => <h3>Loading...</h3>;

// Lazy load the components with correct typing
const LoadableHome = React.lazy<React.FC>(() => import(/* webpackChunkName: "HomePage" */ './pages/Home'));
const LoadableTeam = React.lazy<React.FC>(() => import(/* webpackChunkName: "TeamPage" */ './pages/Team'));
const LoadableBlogs = React.lazy<React.FC>(() => import(/* webpackChunkName: "BlogsPage" */ './pages/Blogs'));
const LoadableLogin = React.lazy<React.FC>(() => import(/* webpackChunkName: "LoginPage" */ './pages/Login'));
const LoadableMyProfile = React.lazy<React.FC>(() => import(/* webpackChunkName: "MyProfilePage" */ './pages/MyProfile'));
const LoadablePost = React.lazy<React.FC>(() => import(/* webpackChunkName: "PostPage" */ './pages/Post'));
const LoadableNotFound = React.lazy<React.FC>(() => import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFound'));

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<LoadComponent />}>
        <Routes>
          <Route path="/" element={<Navigate to={routes.home} />} />
          <Route index path={routes.home} element={<LoadableHome />} />
          <Route path={routes.team} element={<LoadableTeam />} />
          <Route path={routes.blogs} element={<LoadableBlogs />} />
          <Route path={routes.login} element={<LoadableLogin />} />
          <Route path={routes.profile} element={<LoadableMyProfile />} />
          <Route path={routes.post} element={<LoadablePost />} />
          <Route path={routes.notfound} element={<LoadableNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
