import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
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

const CheckboxGroup = styled.div`
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    align-items: center;
`;

const CheckboxLabel = styled.label`
    margin-left: 8px;
    font-size: 14px;
    cursor: pointer;
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

const LoginLink = styled.p`
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

const ErrorMessage = styled.div`
    color: #dc3545;
    margin-bottom: 15px;
    font-size: 14px;
    text-align: left;
`;

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');  
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError('');  
        try {
            const response = await api.post('/users/', {
                username,
                password,
                email,
                is_staff: isAdmin,
            });
            if (response.status === 201) {
                navigate('/');
            } else {
                setError('Registration failed.');  
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError('Registration failed: ' + (error.response.data.detail || 'Please check your input.'));  
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <Container>
            <Box>
                <Logo src="/logoaudio.png" alt="Logo" onClick={() => navigate('/')} />
                <Title>Register</Title>
                {error && <ErrorMessage data-cy="register-error">{error}</ErrorMessage>}
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
                <InputGroup>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        data-cy="email-input"
                    />
                </InputGroup>
                <CheckboxGroup>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        data-cy="admin-checkbox"
                    />
                    <CheckboxLabel>Register as an Administrator</CheckboxLabel>
                </CheckboxGroup>
                <Button onClick={handleRegister} data-cy="register-button">Register</Button>
                <LoginLink>
                    Already have an account? <Link to="/">Login here</Link>.
                </LoginLink>
            </Box>
        </Container>
    );
}

export default Register;
