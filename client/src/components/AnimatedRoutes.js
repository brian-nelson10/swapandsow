import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NoMatch from '../pages/NoMatch';
// import SinglePost from './pages/SingleThought';
// import Profile from './pages/Profile';
import Signup from '../pages/Signup';
import PostFormPage from "../pages/PostFormPage";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    exact element={<Home />}
                />
                <Route
                    path="/home"
                    element={<Home />}
                />
                 <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/signup"
                    element={<Signup />}
                />
                <Route
                    path="/postform"
                    element={<PostFormPage />}
                />
                {/*<Route path="/profile">
                    <Route path=":username" element={<Profile />} />
                    <Route path="" element={<Profile />} />
                </Route>
                <Route
                    path="/post/:id"
                    element={<SinglePost/>}
                />*/}
                <Route
                    path="*"
                    element={<NoMatch />}
                /> 
            </Routes>
        </AnimatePresence>
    )
};
export default AnimatedRoutes;