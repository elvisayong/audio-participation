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

const OpinionList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
`;

const OpinionItem = styled.li`
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
`;

const OpinionText = styled.p`
    font-size: 16px;
    color: #555;
`;

const ReplyForm = styled.form`
    margin-top: 10px;
`;

const ReplyInput = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 10px;
`;

const ReplyButton = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0056b3;
    }
`;

const AdminReply = styled.div`
    margin-top: 10px;
    padding: 10px;
    background-color: #f8f9fa;
    border-left: 4px solid #007bff;
    font-size: 14px;
    color: #555;
`;

const AlreadyRepliedMessage = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #28a745; /* Green color to indicate success */
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
            await api.post(`/opinions/${opinionId}/reply/`, { reply_text: replies[opinionId] });
            alert('Reply submitted successfully');
            setReplies({ ...replies, [opinionId]: '' });  
            
        } catch (error) {
            console.error('Error submitting reply', error);
            alert('Failed to submit reply');
        }
    };

    return (
        <Container>
            {plan ? (
                <Section>
                    <Title>{plan.title}</Title>
                    <PlanDescription>{plan.description}</PlanDescription>
                    <OpinionList>
                        {opinions.length > 0 ? (
                            opinions.map(opinion => (
                                <OpinionItem key={opinion.id}>
                                    <OpinionText>Opinion by {opinion.citizen}: {opinion.transcribed_text || 'Voice note available'}</OpinionText>
                                    <audio controls src={opinion.voice_note} />

                                    {/* Admin Reply Section */}
                                    {user && user.is_staff && user.username === plan.created_by && (
                                        <>
                                            {opinion.replies && opinion.replies.length > 0 ? (
                                                <AlreadyRepliedMessage>You have already replied to this opinion.</AlreadyRepliedMessage>
                                            ) : (
                                                <ReplyForm onSubmit={(e) => handleReplySubmit(opinion.id, e)}>
                                                    <ReplyInput
                                                        placeholder="Write your reply here..."
                                                        value={replies[opinion.id] || ''}
                                                        onChange={(e) => handleReplyChange(opinion.id, e.target.value)}
                                                    />
                                                    <ReplyButton type="submit">Submit Reply</ReplyButton>
                                                </ReplyForm>
                                            )}
                                        </>
                                    )}

                                    {/* Displaying Replies */}
                                    {opinion.replies && opinion.replies.length > 0 && (
                                        opinion.replies.map((reply, index) => (
                                            <AdminReply key={index}>
                                                <strong>Admin Reply:</strong> {reply.reply_text}
                                            </AdminReply>
                                        ))
                                    )}
                                </OpinionItem>
                            ))
                        ) : (
                            <p>No opinions have been submitted yet.</p>
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
