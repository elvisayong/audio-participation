import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    background: linear-gradient(135deg, #f0f2f5, #c9d6ff);
    padding: 40px 20px;
`;

const Box = styled.div`
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin-bottom: 30px;
`;

const Title = styled.h2`
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
`;

const UserDetails = styled.div`
    font-size: 18px;
    color: #555;
    margin-bottom: 20px;
    p {
        margin: 5px 0;
    }
`;

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await api.get('/me/');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    };

    return (
        <Container>
            <Box>
                <Title>User Profile</Title>
                {user && (
                    <UserDetails>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.is_staff ? 'Administrator' : 'User'}</p>
                    </UserDetails>
                )}
            </Box>
        </Container>
    );
};

export default Profile;
