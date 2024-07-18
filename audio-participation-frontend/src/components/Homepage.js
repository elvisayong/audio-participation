import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../services/api';

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

const SortButton = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 20px;

    &:hover {
        background-color: #0056b3;
    }
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

const PlanDescription = styled.p`
    font-size: 16px;
    color: #555;
`;

function Homepage() {
    const [plans, setPlans] = useState([]);
    const [sorted, setSorted] = useState(false);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await api.get('/plans/');
                setPlans(response.data);
            } catch (error) {
                console.error('Error fetching plans', error);
            }
        };

        fetchPlans();
    }, []);

    const sortPlansByDate = () => {
        const sortedPlans = [...plans].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPlans(sortedPlans);
        setSorted(true);
    };

    return (
        <Container>
            <Title>Available Plans</Title>
            <SortButton onClick={sortPlansByDate}>Sort by Date</SortButton>
            <List>
                {plans.map(plan => (
                    <ListItem key={plan.id}>
                        <Link to={`/plans/${plan.id}`}>{plan.title}</Link>
                        <PlanDescription>{plan.description}</PlanDescription>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Homepage;
