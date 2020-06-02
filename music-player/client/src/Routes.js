import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/music-player/Navbar"
import Register from "./components/music-player/Register.js"
import Login from "./components/music-player/Login.js"
import ListOfUsers from "./components/music-player/ListOfusers.js"
import Music from './components/music-player/Music';

const Routes = () => {
    return (
        <Router>
            <Navbar />

            <Route path="/" exact component={Music} />
            <Route path="/michal-mikulski" component={Music} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/listofusers" component={ListOfUsers} />
            <Route path="/music" component={Music} />
        </Router>
    );
}
export default Routes;