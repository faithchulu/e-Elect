"use client"
import React from 'react';
import { PassageFlex, canRegisterPasskey } from '@passageidentity/passage-flex-js';

const passage = new PassageFlex({
    appID: '0g9gJUmNjCfm70VmjjOK9gqc', // Replace with your actual app ID
});

const PassageTest = () => {

    async function handleLogin() {
        try {
            const email = document.getElementById('email').value;
            const response = await passage.login(email);
            console.log('Login successful:', response);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
    
    return (
        <div>
            {/* canRegisterPasskey() && <a onClick={handleCreatePasskeyClick}> Create passkey </a>; */}

            <input type="email" id="email" placeholder="Enter your email" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default PassageTest;
