import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #f0f2f5, #c9d6ff);
`;

const Box = styled.div`
    width: 100%;
    max-width: 400px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    padding: 40px;
    text-align: center;
    position: relative;
    overflow: hidden;
`;

const Logo = styled.img`
    width: 80px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
        transform: scale(1.1);
    }
`;

const Title = styled.h2`
    font-size: 26px;
    margin-bottom: 20px;
    color: #333;
    font-weight: 700;
    text-transform: uppercase;
`;

const InputGroup = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    margin-top: 8px;
    transition: border-color 0.3s;
    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: #007bff;
    color: white;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }
`;

const RegisterLink = styled.p`
    margin-top: 20px;
    font-size: 14px;
    a {
        color: #007bff;
        text-decoration: none;
        transition: color 0.3s;
        &:hover {
            color: #0056b3;
        }
    }
`;

const ErrorMessage = styled.p`
    color: #dc3545;
    font-size: 14px;
    margin-top: 20px;
`;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('tokenExpiry', Date.now() + response.data.access_expires_in * 1000);
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Login failed', error.response ? error.response.data : error.message);
            setError('Login failed. Please check your credentials and try again.'); 
        }
    };

    return (
        <Container>
            <Box>
                <Logo src="/logoaudio.png" alt="Logo" onClick={() => navigate('/')} />
                <Title>Login</Title>
                <InputGroup>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        data-cy="username-input"
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        data-cy="password-input"
                    />
                </InputGroup>
                <Button onClick={handleLogin} data-cy="login-button">Login</Button>
                {error && <ErrorMessage data-cy="login-error">{error}</ErrorMessage>} 
                <RegisterLink>
                    Don't have an account? <Link to="/register">Sign up here</Link>.
                </RegisterLink>
            </Box>
        </Container>
    );
}

export default Login;
