import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const HeaderContainer = styled.header`
    background-color: #343a40;
    padding: 10px 20px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    margin: 0;
    font-size: 24px;
`;

const NavLinks = styled.nav`
    display: flex;
    gap: 15px;

    a {
        color: white;
        text-decoration: none;
        font-size: 16px;
        transition: color 0.3s;

        &:hover {
            color: #007bff;
        }
    }

    button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        transition: color 0.3s;

        &:hover {
            color: #007bff;
        }
    }
`;

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserDetails();
        }
    }, [isAuthenticated]);

    const fetchUserDetails = async () => {
        try {
            const response = await api.get('/me/');
            setIsAdmin(response.data.is_staff);
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <HeaderContainer>
            <Title>Audio Participation</Title>
            <NavLinks>
                {isAuthenticated ? (
                    <>
                        <Link to="/" data-cy="home-link">Home</Link>
                        <Link to="/dashboard" data-cy="dashboard-link">Dashboard</Link>
                        <Link to="/profile" data-cy="profile-link">Profile</Link>
                        {isAdmin && <Link to="/manage-plans" data-cy="manage-plans-link">Manage Plans</Link>}
                        <button onClick={handleLogout} data-cy="logout-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" data-cy="login-link">Login</Link>
                        <Link to="/register" data-cy="register-link">Register</Link>
                    </>
                )}
            </NavLinks>
        </HeaderContainer>
    );
};

export default Header;

