import React, { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #e9eef5, #ffffff);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 38px 32px;
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.72);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0px 20px 38px rgba(0, 0, 0, 0.07);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 25px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 18px;
  background: #f9fafb;
  border: 1px solid #dfe3ea;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 18px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    background: white;
    box-shadow: 0px 0px 8px rgba(37, 99, 235, 0.22);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: #2563eb;
  color: white;
  font-size: 17px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
  }
`;

const Error = styled.p`
  text-align: center;
  color: #dc2626;
  margin-bottom: 10px;
`;

function RequestOtp({ goToOtp }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const requestOTP = async () => {
    if (!email) return setMsg("⚠ Enter email");

    setMsg("Sending OTP...");

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMsg(data.message || "Error");
    } else {
      localStorage.setItem("email", email);
      setMsg("OTP sent ✔");
      setTimeout(() => goToOtp(), 800);
    }
  };

  return (
    <Background>
      <Card>
        <Title>Admin Access</Title>

        {msg && <Error>{msg}</Error>}

        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={requestOTP}>Send OTP</Button>
      </Card>
    </Background>
  );
}

export default RequestOtp;
