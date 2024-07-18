import React, { useState, useEffect } from 'react';
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

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 8px;
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
    margin-top: 10px;
    &:hover {
        background-color: #0056b3;
    }
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
`;

const ListItem = styled.li`
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

function Opinions({ planId }) {
    const [opinions, setOpinions] = useState([]);
    const [voiceNote, setVoiceNote] = useState(null);

    useEffect(() => {
        fetchOpinions();
    }, [planId]);

    const fetchOpinions = async () => {
        try {
            const response = await axios.get(`/api/opinions/?plan=${planId}`);
            setOpinions(response.data);
        } catch (error) {
            console.error('Error fetching opinions', error);
        }
    };

    const handleFileChange = (e) => {
        setVoiceNote(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('voice_note', voiceNote);
        formData.append('plan', planId);

        try {
            await axios.post('/api/opinions/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            fetchOpinions();
        } catch (error) {
            console.error('Error uploading voice note', error);
        }
    };

    return (
        <Container>
            <Title>Opinions</Title>
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Upload Voice Note</Button>
            <List>
                {opinions.map(opinion => (
                    <ListItem key={opinion.id}>
                        <OpinionText>{opinion.transcribed_text}</OpinionText>
                        <audio controls src={opinion.voice_note} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Opinions;
