import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const PlanDescription = styled.p`
    font-size: 16px;
    color: #555;
`;

function PlanDetails() {
    const { planId } = useParams();
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                const response = await api.get(`/plans/${planId}/`);
                setPlan(response.data);
            } catch (error) {
                console.error('Error fetching plan details', error);
            }
        };

        fetchPlanDetails();
    }, [planId]);

    return (
        <Container>
            {plan ? (
                <Section>
                    <Title>{plan.title}</Title>
                    <PlanDescription>{plan.description}</PlanDescription>
                </Section>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
}

export default PlanDetails;
