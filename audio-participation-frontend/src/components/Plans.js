import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    padding: 20px;
    background-color: #f0f2f5;
    min-height: 100vh;
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 15px;
    font-size: 18px;
    color: #007bff;
`;

function Plans() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('/api/plans/');
                setPlans(response.data);
            } catch (error) {
                console.error('Error fetching plans', error);
            }
        };

        fetchPlans();
    }, []);

    return (
        <Container>
            <Title>Plans</Title>
            <List>
                {plans.map(plan => (
                    <ListItem key={plan.id}>{plan.title}</ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Plans;
