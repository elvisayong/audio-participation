import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppContainer from './components/AppContainer'; // Ensure this import is correct
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Plans from './components/Plans';
import Opinions from './components/Opinions';
import PlanManagement from './components/PlanManagement';
import OpinionSubmission from './components/OpinionSubmission';
import PlanDetails from './components/PlanDetails';
import Homepage from './components/Homepage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <AppContainer>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute element={Homepage} />} />
                        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
                        <Route path="/plans" element={<PrivateRoute element={Plans} />} />
                        <Route path="/opinions/:planId" element={<PrivateRoute element={Opinions} />} />
                        <Route path="/manage-plans" element={<PrivateRoute element={PlanManagement} />} />
                        <Route path="/submit-opinion" element={<PrivateRoute element={OpinionSubmission} />} />
                        <Route path="/plans/:planId" element={<PrivateRoute element={PlanDetails} />} />
                    </Routes>
                </AppContainer>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
