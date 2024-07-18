import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
    padding: 20px;
    background-color: #f0f2f5;
    min-height: 100vh;
`;

const Section = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const SubTitle = styled.h3`
    font-size: 20px;
    color: #333;
    margin-bottom: 15px;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    cursor: pointer;
`;

const PlanTitle = styled.h4`
    font-size: 18px;
    color: #007bff;
    margin: 0;
`;

const PlanDescription = styled.p`
    font-size: 16px;
    color: #555;
`;

const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px;
    &:hover {
        background-color: #0056b3;
    }
`;

const AddOpinionButton = styled(Button)`
    background-color: #28a745;
    &:hover {
        background-color: #218838;
    }
`;

function Dashboard() {
    const [user, setUser] = useState(null);
    const [plans, setPlans] = useState([]);
    const [opinions, setOpinions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
        fetchPlans();
        fetchOpinions();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await api.get('/me/');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    };

    const fetchPlans = async () => {
        try {
            const response = await api.get('/plans/');
            setPlans(response.data);
        } catch (error) {
            console.error('Error fetching plans', error);
        }
    };

    const fetchOpinions = async () => {
        try {
            const response = await api.get('/opinions/');
            setOpinions(response.data);
        } catch (error) {
            console.error('Error fetching opinions', error);
        }
    };

    const handlePlanClick = (planId) => {
        navigate(`/plans/${planId}`);
    };

    const handleAddOpinion = (planId) => {
        navigate(`/opinions/${planId}`);
    };

    return (
        <Container>
            <Title>User Dashboard</Title>
            {user && (
                <Section>
                    <SubTitle>User Details</SubTitle>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    {user.is_staff && <Button onClick={() => navigate('/manage-plans')}>Manage Plans</Button>}
                </Section>
            )}
            <Section>
                <SubTitle>Urban Planning Projects</SubTitle>
                <List>
                    {plans.map(plan => (
                        <ListItem key={plan.id} onClick={() => handlePlanClick(plan.id)}>
                            <PlanTitle>{plan.title}</PlanTitle>
                            <PlanDescription>{plan.description}</PlanDescription>
                            {!user.is_staff && <AddOpinionButton onClick={(e) => { e.stopPropagation(); handleAddOpinion(plan.id); }}>Add Opinion</AddOpinionButton>}
                        </ListItem>
                    ))}
                </List>
            </Section>
            <Section>
                <SubTitle>Your Opinions</SubTitle>
                <List>
                    {opinions.map(opinion => (
                        <ListItem key={opinion.id}>
                            <PlanTitle>On Plan: {opinion.plan.title}</PlanTitle>
                            <PlanDescription>{opinion.transcribed_text}</PlanDescription>
                        </ListItem>
                    ))}
                </List>
            </Section>
        </Container>
    );
}

export default Dashboard;
