import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from '../pages/Login';
import Signup from '../pages/Signup';


function AnimatedLogRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                 <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/signup"
                    element={<Signup />}
                />
            </Routes>
        </AnimatePresence>
    )
};
export default AnimatedLogRoutes;