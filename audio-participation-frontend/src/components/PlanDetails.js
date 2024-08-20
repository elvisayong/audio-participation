import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
    padding: 20px;
    background-color: #f0f2f5;
    min-height: 100vh;
    display: flex;
    justify-content: center;
`;

const Section = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
`;

const Title = styled.h2`
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
`;

const PlanDescription = styled.p`
    font-size: 18px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 30px;
    text-align: justify;
`;

const OpinionList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const OpinionItem = styled.li`
    margin-bottom: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

const OpinionText = styled.p`
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
`;

const AudioPlayer = styled.audio`
    margin-top: 10px;
    width: 100%;
`;

const ReplyForm = styled.form`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
`;

const ReplyInput = styled.textarea`
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 15px;
    resize: vertical;
`;

const ReplyButton = styled.button`
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    align-self: flex-start;
    &:hover {
        background-color: #0056b3;
    }
`;

const AdminReply = styled.div`
    margin-top: 20px;
    padding: 15px;
    background-color: #e9ecef;
    border-left: 4px solid #007bff;
    border-radius: 8px;
    font-size: 15px;
    color: #333;
    position: relative;
`;

const DeleteReplyButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
        background-color: #c82333;
    }
`;

function PlanDetails() {
    const { planId } = useParams();
    const [plan, setPlan] = useState(null);
    const [opinions, setOpinions] = useState([]);
    const [user, setUser] = useState(null);
    const [replies, setReplies] = useState({});

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                const response = await api.get(`/plans/${planId}/`);
                setPlan(response.data);
            } catch (error) {
                console.error('Error fetching plan details', error);
            }
        };

        const fetchOpinions = async () => {
            try {
                const response = await api.get(`/opinions/?plan=${planId}`);
                setOpinions(response.data);
            } catch (error) {
                console.error('Error fetching opinions', error);
            }
        };

        const fetchUserDetails = async () => {
            try {
                const response = await api.get('/me/');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details', error);
            }
        };

        fetchPlanDetails();
        fetchOpinions();
        fetchUserDetails();
    }, [planId]);

    const handleReplyChange = (opinionId, value) => {
        setReplies({ ...replies, [opinionId]: value });
    };

    const handleReplySubmit = async (opinionId, e) => {
        e.preventDefault();
        try {
            const url = `/opinions/${opinionId}/reply/`;
            console.log(`Submitting reply to URL: ${url}`);
            await api.post(url, { reply_text: replies[opinionId] });
            alert('Reply submitted successfully');
            setReplies({ ...replies, [opinionId]: '' });
        } catch (error) {
            console.error('Error submitting reply', error);
            alert('Failed to submit reply');
        }
    };

    const handleReplyDelete = async (opinionId) => {
        try {
            const url = `/opinions/${opinionId}/delete_reply/`;
            console.log(`Deleting reply at URL: ${url}`);
            await api.delete(url);
            alert('Reply deleted successfully');
            // Re-fetch opinions to update the UI
            const response = await api.get(`/opinions/?plan=${planId}`);
            setOpinions(response.data);
        } catch (error) {
            console.error('Error deleting reply', error);
            alert('Failed to delete reply');
        }
    };

    return (
        <Container>
            {plan ? (
                <Section data-cy="plan-details-section">
                    <Title data-cy="plan-title">{plan.title}</Title>
                    <PlanDescription data-cy="plan-description">{plan.description}</PlanDescription>
                    <OpinionList data-cy="opinion-list">
                        {opinions.length > 0 ? (
                            opinions.map(opinion => (
                                <OpinionItem key={opinion.id} data-cy={`opinion-item-${opinion.id}`}>
                                    <OpinionText data-cy="opinion-text">
                                        Opinion by {opinion.citizen}: {opinion.transcribed_text || 'Voice note available'}
                                    </OpinionText>
                                    <AudioPlayer controls src={opinion.voice_note} data-cy="opinion-audio" />

                                    {user && user.is_staff && user.username === plan.created_by && (
                                        <>
                                            {opinion.replies && opinion.replies.length > 0 ? (
                                                <>
                                                    <AdminReply data-cy="admin-reply">
                                                        <strong>Admin Reply:</strong> {opinion.replies[0].reply_text}
                                                        <DeleteReplyButton
                                                            onClick={() => handleReplyDelete(opinion.id)}
                                                            data-cy="delete-reply-button"
                                                        >
                                                            Delete
                                                        </DeleteReplyButton>
                                                    </AdminReply>
                                                </>
                                            ) : (
                                                <ReplyForm onSubmit={(e) => handleReplySubmit(opinion.id, e)} data-cy="reply-form">
                                                    <ReplyInput
                                                        placeholder="Write your reply here..."
                                                        value={replies[opinion.id] || ''}
                                                        onChange={(e) => handleReplyChange(opinion.id, e.target.value)}
                                                        data-cy="reply-input"
                                                    />
                                                    <ReplyButton type="submit" data-cy="submit-reply-button">Submit Reply</ReplyButton>
                                                </ReplyForm>
                                            )}
                                        </>
                                    )}
                                </OpinionItem>
                            ))
                        ) : (
                            <p data-cy="no-opinions-message">No opinions have been submitted yet.</p>
                        )}
                    </OpinionList>
                </Section>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
}

export default PlanDetails;
