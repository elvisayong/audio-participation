import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const HeaderContainer = styled.header`
    background-color: rgba(52, 58, 64, 0.8);
    backdrop-filter: blur(10px);
    padding: 15px 30px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const Logo = styled.img`
    height: 40px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const NavLinks = styled.nav`
    display: flex;
    gap: 20px;

    a {
        color: white;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        transition: color 0.3s ease, transform 0.3s ease;

        &:hover {
            color: #00d4ff;
            transform: translateY(-2px);
        }
    }

    button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        transition: color 0.3s ease, transform 0.3s ease;

        &:hover {
            color: #00d4ff;
            transform: translateY(-2px);
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
            <Link to="/">
                <Logo src="/logoaudio.png" alt="Audio Participation Logo" data-cy="logo" />
            </Link>
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
