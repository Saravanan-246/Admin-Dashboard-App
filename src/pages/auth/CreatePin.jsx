import React, { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f4f6;
`;

const Box = styled.div`
  width: 360px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 10px 25px rgba(0,0,0,0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  text-align: center;
  font-size: 22px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  letter-spacing: 6px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: #2563eb;
  color: white;
  font-size: 17px;
  border-radius: 10px;

  &:hover {
    background: #1d4ed8;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 8px;
`;

function CreatePin({ onPinCreated }) {
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (pin.length !== 4) return setError("PIN must be 4 digits");
    if (pin !== confirm) return setError("PIN does not match");
    setError("");
    onPinCreated();
  };

  return (
    <Background>
      <Box>
        <Title>Create Security PIN</Title>

        {error && <Error>{error}</Error>}

        <Input 
          type="password"
          maxLength="4"
          placeholder="Enter 4 digit PIN"
          onChange={(e)=>setPin(e.target.value)}
        />

        <Input 
          type="password"
          maxLength="4"
          placeholder="Confirm PIN"
          onChange={(e)=>setConfirm(e.target.value)}
        />

        <Button onClick={handleSubmit}>Save PIN</Button>
      </Box>
    </Background>
  );
}

export default CreatePin;
