import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { FaCircle, FaSortUp, FaSortDown } from 'react-icons/fa';

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
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
        margin-left: 10px;
        font-size: 18px;
    }
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
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background-color: #f1f1f1; /* Highlight color on hover */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;

const PlanHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PlanTitle = styled.h4`
    font-size: 18px;
    color: #007bff;
    margin: 0;
`;

const ExpiryInfo = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${props => props.isExpired ? '#dc3545' : '#28a745'};

    svg {
        margin-right: 5px;
    }
`;

const PlanDescription = styled.p`
    font-size: 16px;
    color: #555;
`;

const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: ${props => props.disabled ? '#ccc' : '#007bff'};
    color: white;
    font-size: 14px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: background-color 0.3s;
    margin-right: 10px;
    &:hover {
        background-color: ${props => props.disabled ? '#ccc' : '#0056b3'};
    }
`;

const AddOpinionButton = styled(Button)`
    background-color: ${props => props.disabled ? '#ccc' : '#28a745'};
    &:hover {
        background-color: ${props => props.disabled ? '#ccc' : '#218838'};
    }
`;

const AudioPlayer = styled.audio`
    margin-top: 10px;
    width: 100%;
`;

const SubmissionDate = styled.p`
    font-size: 14px;
    color: #555;
`;

const AdminReplyIndicator = styled.p`
    font-size: 14px;
    color: #28a745;
    margin-top: 10px;
`;

function Dashboard() {
    const [user, setUser] = useState(null);
    const [plans, setPlans] = useState([]);
    const [opinions, setOpinions] = useState([]);
    const [sortPlansAsc, setSortPlansAsc] = useState(true);
    const [sortOpinionsAsc, setSortOpinionsAsc] = useState(true);
    const navigate = useNavigate();

    const fetchPlans = useCallback(async () => {
        try {
            const response = await api.get('/plans/');
            const sortedPlans = response.data.sort((a, b) => {
                const dateA = new Date(a.expiration_date);
                const dateB = new Date(b.expiration_date);
                return sortPlansAsc ? dateA - dateB : dateB - dateA;
            });
            setPlans(sortedPlans);
        } catch (error) {
            console.error('Error fetching plans', error);
        }
    }, [sortPlansAsc]);

    const fetchOpinions = useCallback(async () => {
        try {
            const response = await api.get('/opinions/');
            const sortedOpinions = response.data.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return sortOpinionsAsc ? dateA - dateB : dateB - dateA;
            });
            setOpinions(sortedOpinions);
        } catch (error) {
            console.error('Error fetching opinions', error);
        }
    }, [sortOpinionsAsc]);

    useEffect(() => {
        fetchUserDetails();
        fetchPlans();
        fetchOpinions();
    }, [fetchPlans, fetchOpinions]);

    const fetchUserDetails = async () => {
        try {
            const response = await api.get('/me/');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    };

    const toggleSortPlansOrder = () => {
        setSortPlansAsc(!sortPlansAsc);
    };

    const toggleSortOpinionsOrder = () => {
        setSortOpinionsAsc(!sortOpinionsAsc);
    };

    const calculateDaysRemaining = (expirationDate) => {
        const expiryDate = new Date(expirationDate);
        const today = new Date();
        const timeDifference = expiryDate - today;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysRemaining;
    };

    const isExpired = (expirationDate) => {
        const daysRemaining = calculateDaysRemaining(expirationDate);
        return daysRemaining < 0;
    };

    const handlePlanClick = (planId) => {
        navigate(`/plans/${planId}`);
    };

    const handleAddOpinion = (planId) => {
        navigate(`/opinions/${planId}`);
    };

    const handleOpinionClick = (planId) => {
        navigate(`/plans/${planId}`);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Title data-cy="dashboard-title">User Dashboard</Title>
            <Section>
                <SubTitle data-cy="sort-plans-button" onClick={toggleSortPlansOrder}>
                    Urban Planning Projects
                    {sortPlansAsc ? <FaSortUp /> : <FaSortDown />}
                </SubTitle>
                <List data-cy="plans-list">
                    {plans.map(plan => (
                        <ListItem
                            key={plan.id}
                            data-cy="plan-item"
                            onClick={() => {
                                if (user.is_staff) {
                                    handlePlanClick(plan.id);
                                }
                            }}
                            style={{ cursor: user.is_staff ? 'pointer' : 'default' }}
                        >
                            <PlanHeader>
                                <PlanTitle>{plan.title} (<span data-cy="plan-opinion-count">{plan.opinion_count} opinions</span>)</PlanTitle>
                                {plan.expiration_date && (
                                    <ExpiryInfo isExpired={isExpired(plan.expiration_date)}>
                                        <FaCircle color={isExpired(plan.expiration_date) ? '#dc3545' : '#28a745'} />
                                        {isExpired(plan.expiration_date) ? 'Expired' : `Expires in ${calculateDaysRemaining(plan.expiration_date)} days`}
                                    </ExpiryInfo>
                                )}
                            </PlanHeader>
                            <PlanDescription>{plan.description}</PlanDescription>
                            {!user.is_staff && (
                                <AddOpinionButton
                                    data-cy={`add-opinion-button-${plan.id}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!isExpired(plan.expiration_date)) {
                                            handleAddOpinion(plan.id);
                                        }
                                    }}
                                    disabled={isExpired(plan.expiration_date)}
                                    title={isExpired(plan.expiration_date) ? "Submissions can no longer be submitted for this plan as it is expired" : ""}
                                >
                                    Add Opinion
                                </AddOpinionButton>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Section>
            <Section>
                <SubTitle data-cy="sort-opinions-button" onClick={toggleSortOpinionsOrder}>
                    Your Opinions
                    {sortOpinionsAsc ? <FaSortUp /> : <FaSortDown />}
                </SubTitle>
                {opinions.length > 0 ? (
                    <List data-cy="opinions-list">
                        {opinions.map(opinion => (
                            <ListItem key={opinion.id} data-cy="opinion-item" onClick={() => handleOpinionClick(opinion.plan.id)}>
                                <PlanTitle>On Plan: {opinion.plan.title}</PlanTitle>
                                <SubmissionDate>Submitted on: {new Date(opinion.created_at).toLocaleDateString()}</SubmissionDate>
                                <ExpiryInfo isExpired={isExpired(opinion.plan.expiration_date)}>
                                    <FaCircle color={isExpired(opinion.plan.expiration_date) ? '#dc3545' : '#28a745'} />
                                    {isExpired(opinion.plan.expiration_date) ? 'Expired' : 'Active'}
                                </ExpiryInfo>
                                <AudioPlayer controls src={opinion.voice_note} />
                                {opinion.replies && opinion.replies.length > 0 && (
                                    <AdminReplyIndicator data-cy="admin-reply-indicator">
                                        Admin has replied to your opinion.
                                    </AdminReplyIndicator>
                                )}
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <p>No opinions submitted yet.</p>
                )}
            </Section>
        </Container>
    );
}

export default Dashboard;
