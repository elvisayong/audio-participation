import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
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

const Form = styled.form`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 20px;
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

const AudioPreview = styled.div`
    margin-top: 20px;
`;

function OpinionSubmission() {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await api.get('/plans/');
            setPlans(response.data);
        } catch (error) {
            console.error('Error fetching plans', error);
        }
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = event => {
            const audioChunks = [event.data];
            const blob = new Blob(audioChunks, { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            setAudioBlob(blob);
            setAudioUrl(url);
        };
        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPlan || !audioBlob) {
            alert('Please select a plan and record a voice note.');
            return;
        }

        const formData = new FormData();
        formData.append('plan', selectedPlan);
        formData.append('voice_note', audioBlob);

        try {
            const response = await api.post('/opinions/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 201) {
                alert('Opinion submitted successfully!');
                setSelectedPlan('');
                setAudioUrl('');
                setAudioBlob(null);
            } else {
                alert('Failed to submit opinion.');
            }
        } catch (error) {
            console.error('Error submitting opinion', error);
            alert('Error submitting opinion.');
        }
    };

    return (
        <Container>
            <Title>Submit Your Opinion</Title>
            <Form onSubmit={handleSubmit}>
                <Label>
                    Select Plan:
                    <Select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                        <option value="">Select a plan</option>
                        {plans.map(plan => (
                            <option key={plan.id} value={plan.id}>{plan.title}</option>
                        ))}
                    </Select>
                </Label>
                <div>
                    {!recording ? (
                        <Button type="button" onClick={startRecording}>
                            <FaMicrophone /> Start Recording
                        </Button>
                    ) : (
                        <Button type="button" onClick={stopRecording}>
                            <FaStop /> Stop Recording
                        </Button>
                    )}
                </div>
                {audioUrl && (
                    <AudioPreview>
                        <h3>Preview:</h3>
                        <audio controls src={audioUrl} ref={audioRef} />
                    </AudioPreview>
                )}
                <Button type="submit">Submit Opinion</Button>
            </Form>
        </Container>
    );
}

export default OpinionSubmission;
