import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

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
`;

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

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
                        <Link to="/">Home</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/manage-plans">Manage Plans</Link>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </NavLinks>
        </HeaderContainer>
    );
};

export default Header;
