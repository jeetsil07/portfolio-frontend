import React, { Suspense, useEffect } from 'react';
import Navbar from './components/header/Navbar';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/footer/Footer';
import routes from './util/routes';
import { HelmetProvider } from 'react-helmet-async';

// Lazy load the components with Webpack chunk names
const LoadableHome = React.lazy(() => import(/* webpackChunkName: "HomePage" */ './pages/Home'));
const LoadableTeam = React.lazy(() => import(/* webpackChunkName: "TeamPage" */ './pages/Team'));
const LoadableBlogs = React.lazy(() => import(/* webpackChunkName: "BlogsPage" */ './pages/Blogs'));
const LoadableLogin = React.lazy(() => import(/* webpackChunkName: "LoginPage" */ './pages/Login'));
const LoadableMyProfile = React.lazy(() => import(/* webpackChunkName: "MyProfilePage" */ './pages/MyProfile'));
const LoadablePost = React.lazy(() => import(/* webpackChunkName: "PostPage" */ './pages/Post'));
const LoadableNotFound = React.lazy(() => import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFound'));

// Fallback component to show while lazy-loaded components are being fetched
const LoadComponent = () => <h3>Loading...</h3>;

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <HelmetProvider>
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
            <Route path={`${routes.post}/:id`} element={<LoadablePost />} />
            <Route path={routes.notfound} element={<LoadableNotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
