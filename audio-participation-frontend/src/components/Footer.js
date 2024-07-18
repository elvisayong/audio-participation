import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #343a40;
    padding: 20px;
    color: white;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
`;

const FooterText = styled.p`
    margin: 0;
    font-size: 14px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>&copy; 2024 Audio Participation. All rights reserved.</FooterText>
        </FooterContainer>
    );
};

export default Footer;
