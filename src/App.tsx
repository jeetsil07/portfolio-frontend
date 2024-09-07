import React, { Suspense } from 'react';
import Navbar from './components/header/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import routes from './util/routes';

// Lazy load the components
const LoadableHome = React.lazy(() => import(/* webpackChunkName: "HomePage" */ './pages/Home'));
const LoadableAbout = React.lazy(() => import(/* webpackChunkName: "AboutPage" */ './pages/About'));
const LoadableTeam = React.lazy(() => import(/* webpackChunkName: "TeamPage" */ './pages/Team'));
const LoadableBlogs = React.lazy(() => import(/* webpackChunkName: "BlogsPage" */ './pages/Blogs'));
const LoadablePost = React.lazy(() => import(/* webpackChunkName: "PostPage" */ './pages/Post'));
const LoadableContact = React.lazy(() => import(/* webpackChunkName: "ContactPage" */ './pages/Contact'));
const LoadableLogin = React.lazy(() => import(/* webpackChunkName: "LoginPage" */ './pages/Login'));
const LoadableMyProfile = React.lazy(() => import(/* webpackChunkName: "MyProfilePage" */ './pages/MyProfile'));
const LoadableNotFound = React.lazy(() => import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFound'));

// Fallback component to show while lazy-loaded components are being fetched
const LoadComponent = () => <h3>Loading...</h3>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<LoadComponent />}>
        <Routes>
          <Route path="/" element={<Navigate to={routes.home} />} />
          <Route index path={routes.home} element={<LoadableHome />} />
          <Route path={routes.about} element={<LoadableAbout />} />
          <Route path={routes.team} element={<LoadableTeam />} />
          <Route path={routes.blogs} element={<LoadableBlogs />} />
          <Route path={routes.contact} element={<LoadableContact />} />
          <Route path={routes.login} element={<LoadableLogin />} />
          <Route path={routes.profile} element={<LoadableMyProfile />} />
          <Route path={routes.post} element={<LoadablePost />} />
          <Route path={routes.notfound} element={<LoadableNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
