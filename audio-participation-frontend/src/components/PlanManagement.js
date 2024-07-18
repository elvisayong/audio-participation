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
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const Form = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 10px;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 10px;
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
    color: #333;
    margin: 0;
`;

const PlanDescription = styled.p`
    font-size: 16px;
    color: #555;
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
    const [editingPlan, setEditingPlan] = useState(null);
    const navigate = useNavigate();

    const fetchUserDetails = useCallback(async () => {
        try {
            const response = await api.get('/me/');
            if (!response.data.is_staff) {
                navigate('/dashboard'); // Redirect non-admin users to dashboard
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
                await api.put(`/plans/${editingPlan.id}/`, { title, description });
                setPlans(plans.map(plan => (plan.id === editingPlan.id ? { ...plan, title, description } : plan)));
            } else {
                const response = await api.post('/plans/', { title, description });
                setPlans([...plans, response.data]);
            }
            setTitle('');
            setDescription('');
            setEditingPlan(null);
        } catch (error) {
            console.error(`Error ${editingPlan ? 'updating' : 'creating'} plan`, error);
        }
    };

    const handleEditPlan = (plan) => {
        setTitle(plan.title);
        setDescription(plan.description);
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
            <Title>Manage Plans</Title>
            <Form>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                ></Textarea>
                <Button onClick={handleCreateOrUpdatePlan}>
                    {editingPlan ? 'Update Plan' : 'Create Plan'}
                </Button>
            </Form>
            <List>
                {plans.map(plan => (
                    <ListItem key={plan.id}>
                        <PlanTitle>{plan.title}</PlanTitle>
                        <PlanDescription>{plan.description}</PlanDescription>
                        <EditButton onClick={() => handleEditPlan(plan)}>Edit</EditButton>
                        <DeleteButton onClick={() => handleDeletePlan(plan.id)}>Delete</DeleteButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default PlanManagement;
