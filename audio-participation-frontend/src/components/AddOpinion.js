import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function AddOpinion() {
    const { planId } = useParams();
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioRef = useRef(null);

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

    const handleUpload = async () => {
        if (!planId) {
            toast.error('Plan ID is missing');
            return;
        }

        const formData = new FormData();
        formData.append('voice_note', audioBlob);
        formData.append('plan', planId);

        try {
            const response = await axios.post('http://localhost:8000/api/opinions/', formData, {  
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Voice note uploaded successfully!');
            setAudioUrl('');
            setAudioBlob(null);
        } catch (error) {
            toast.error('Error uploading voice note');
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Title data-cy="add-opinion-title">Add Your Opinion for Plan {planId}</Title>
            <Button onClick={handleUpload} data-cy="upload-voice-note-button">Upload Voice Note</Button>
            <div>
                {!recording ? (
                    <Button type="button" onClick={startRecording} data-cy="start-recording-button">
                        <FaMicrophone /> Start Recording
                    </Button>
                ) : (
                    <Button type="button" onClick={stopRecording} data-cy="stop-recording-button">
                        <FaStop /> Stop Recording
                    </Button>
                )}
            </div>
            {audioUrl && (
                <AudioPreview>
                    <h3>Preview:</h3>
                    <audio controls src={audioUrl} ref={audioRef} data-cy="audio-preview" />
                </AudioPreview>
            )}
        </Container>
    );
}

export default AddOpinion;
