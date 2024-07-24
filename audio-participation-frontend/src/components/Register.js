import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';  // Import the Axios instance
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #f0f2f5;
`;

const Box = styled.div`
    width: 100%;
    max-width: 400px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
`;

const InputGroup = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 8px;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0056b3;
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

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        try {
            const response = await api.post('/users/', {
                username,
                password,
                email
            });
            if (response.status === 201) {

                window.location.href = '/';
            } else {
                // Handle registration error
                console.error('Registration failed', response.data);
            }
        } catch (error) {
            console.error('Registration failed', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container>
            <Box>
                <Title>Register</Title>
                <InputGroup>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </InputGroup>
                <Button onClick={handleRegister}>Register</Button>
                <LoginLink>
                    Already have an account? <Link to="/">Login here</Link>.
                </LoginLink>
            </Box>
        </Container>
    );
}

export default Register;
