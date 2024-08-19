import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
    padding: 20px;
    background-color: #f0f2f5;
    min-height: 100vh;
`;

const Title = styled.h2`
    font-size: 26px;
    color: #333;
    margin-bottom: 20px;
    font-weight: 700;
`;

const Form = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-size: 14px;
    color: #333;
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    margin-bottom: 10px;
    transition: border-color 0.3s;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    margin-bottom: 10px;
    transition: border-color 0.3s;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;
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

const ExpirationDate = styled.p`
    font-size: 14px;
    color: #888;
`;

const EditButton = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #ffc107;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px;
    &:hover {
        background-color: #e0a800;
    }
`;

const DeleteButton = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #dc3545;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #c82333;
    }
`;

function PlanManagement() {
    const [plans, setPlans] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [editingPlan, setEditingPlan] = useState(null);
    const navigate = useNavigate();

    const fetchUserDetails = useCallback(async () => {
        try {
            const response = await api.get('/me/');
            if (!response.data.is_staff) {
                navigate('/dashboard'); 
            }
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    }, [navigate]);

    const fetchPlans = useCallback(async () => {
        try {
            const response = await api.get('/plans/');
            setPlans(response.data);
        } catch (error) {
            console.error('Error fetching plans', error);
        }
    }, []);

    useEffect(() => {
        fetchUserDetails();
        fetchPlans();
    }, [fetchUserDetails, fetchPlans]);

    const handleCreateOrUpdatePlan = async () => {
        try {
            if (editingPlan) {
                await api.put(`/plans/${editingPlan.id}/`, { title, description, expiration_date: expirationDate });
                setPlans(plans.map(plan => (plan.id === editingPlan.id ? { ...plan, title, description, expiration_date: expirationDate } : plan)));
            } else {
                const response = await api.post('/plans/', { title, description, expiration_date: expirationDate });
                setPlans([...plans, response.data]);
            }
            setTitle('');
            setDescription('');
            setExpirationDate('');
            setEditingPlan(null);
        } catch (error) {
            console.error(`Error ${editingPlan ? 'updating' : 'creating'} plan`, error);
        }
    };

    const handleEditPlan = (plan) => {
        setTitle(plan.title);
        setDescription(plan.description);
        setExpirationDate(plan.expiration_date);
        setEditingPlan(plan);
    };

    const handleDeletePlan = async (id) => {
        try {
            await api.delete(`/plans/${id}/`);
            setPlans(plans.filter(plan => plan.id !== id));
        } catch (error) {
            console.error('Error deleting plan', error);
        }
    };

    return (
        <Container>
            <Title data-cy="manage-plans-title">Manage Plans</Title>
            <Form data-cy="plan-form">
                <Label>Plan Title</Label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter plan title"
                    data-cy="plan-title-input"
                />
                <Label>Plan Description</Label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter plan description"
                    data-cy="plan-description-input"
                />
                <Label>Expiration Date (Last date for opinions)</Label>
                <Input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    data-cy="plan-expiration-date-input"
                />
                <Button onClick={handleCreateOrUpdatePlan} data-cy="submit-plan-button">
                    {editingPlan ? 'Update Plan' : 'Create Plan'}
                </Button>
            </Form>
            <List data-cy="plans-list">
                {plans.map(plan => (
                    <ListItem key={plan.id} data-cy="plan-item">
                        <PlanTitle data-cy="plan-title">{plan.title}</PlanTitle>
                        <PlanDescription data-cy="plan-description">{plan.description}</PlanDescription>
                        <ExpirationDate data-cy="plan-expiration-date">Expiration Date: {plan.expiration_date || 'N/A'}</ExpirationDate>
                        <EditButton onClick={() => handleEditPlan(plan)} data-cy="edit-plan-button">Edit</EditButton>
                        <DeleteButton onClick={() => handleDeletePlan(plan.id)} data-cy="delete-plan-button">Delete</DeleteButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default PlanManagement;
