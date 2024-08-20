import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Container = styled.div`
    background-color: #f0f2f5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeroSection = styled.section`
    background: linear-gradient(135deg, #007bff, #00d4ff);
    color: white;
    padding: 60px 20px;
    text-align: center;
    width: 100%;
`;

const HeroTitle = styled.h1`
    font-size: 48px;
    margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
    font-size: 24px;
    margin-bottom: 40px;
`;

const HeroButton = styled(Link)`
    padding: 15px 30px;
    border-radius: 8px;
    background-color: #0056b3;
    color: white;
    font-size: 18px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: #003f7f;
    }
`;

const AboutSection = styled.section`
    padding: 60px 20px;
    text-align: center;
    background-color: #fff;
    width: 100%;
`;

const SectionTitle = styled.h2`
    font-size: 36px;
    color: #333;
    margin-bottom: 20px;
`;

const SectionSubtitle = styled.p`
    font-size: 18px;
    color: #555;
    max-width: 800px;
    margin: 0 auto;
`;

const RolesSection = styled.section`
    padding: 60px 20px;
    background-color: #e9ecef;
    width: 100%;
    text-align: center;
`;

const RoleCards = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
`;

const RoleCard = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 300px;
    text-align: left;
`;

const RoleTitle = styled.h3`
    font-size: 24px;
    color: #007bff;
    margin-bottom: 15px;
`;

const RoleDescription = styled.p`
    font-size: 16px;
    color: #555;
`;

const PlansSection = styled.section`
    padding: 60px 20px;
    background-color: #f8f9fa;
    width: 100%;
`;

const PlansTitle = styled(SectionTitle)`
    margin-bottom: 30px;
`;

const SortButton = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

const PlanList = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const PlanItem = styled.li`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    font-size: 18px;
    color: #007bff;

    a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
        font-size: 20px;
        transition: color 0.3s;

        &:hover {
            color: #0056b3;
        }
    }
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
            <HeroSection>
                <HeroTitle>Welcome to Audio Participation</HeroTitle>
                <HeroSubtitle>Empowering communities to have their voices heard in urban planning.</HeroSubtitle>
                <HeroButton to="/register">Get Started</HeroButton>
            </HeroSection>

            <AboutSection>
                <SectionTitle>About the App</SectionTitle>
                <SectionSubtitle>
                    Audio Participation is an innovative platform that allows citizens to submit voice opinions on urban planning projects, ensuring that every voice is heard in the development of our cities.
                </SectionSubtitle>
            </AboutSection>

            <RolesSection>
                <SectionTitle>Roles & Responsibilities</SectionTitle>
                <RoleCards>
                    <RoleCard>
                        <RoleTitle>Admin</RoleTitle>
                        <RoleDescription>
                            Admins manage urban planning projects, review opinions, and engage with citizens by providing feedback.
                        </RoleDescription>
                    </RoleCard>
                    <RoleCard>
                        <RoleTitle>Citizen</RoleTitle>
                        <RoleDescription>
                            Citizens participate by submitting voice opinions on urban plans and engaging with city planners.
                        </RoleDescription>
                    </RoleCard>
                </RoleCards>
            </RolesSection>


        </Container>
    );
}

export default Homepage;
