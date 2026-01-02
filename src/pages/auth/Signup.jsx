import React, { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #e9eef5, #ffffff);
`;

const GlassCard = styled.div`
  width: 100%;
  max-width: 380px;
  padding: 28px 26px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.45);
  box-shadow: 0px 16px 30px rgba(0,0,0,0.06);
  backdrop-filter: blur(12px);
  animation: fadeIn .28s ease;

  @keyframes fadeIn {
    from { opacity:0; transform:translateY(8px); }
    to { opacity:1; transform:translateY(0); }
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  margin-bottom: 25px;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 22px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 6px 0;
  font-size: 15px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #cbd5e1;
  outline: none;
  transition: 0.3s;
  color: #0f172a;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-18px);
    font-size: 12px;
    color: #2563eb;
  }

  &:focus {
    border-color: #2563eb;
  }
`;

const FloatingLabel = styled.label`
  position: absolute;
  left: 0;
  top: 6px;
  font-size: 14px;
  color: #64748b;
  pointer-events: none;
  transition: 0.3s;
`;

const Button = styled.button`
  width: 100%;
  padding: 11px;
  margin-top: 4px;
  font-size: 15px;
  font-weight: 500;
  color: white;
  background: #2563eb;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0px 6px 14px rgba(37,99,235,0.18);
  }
`;

const SwitchText = styled.p`
  font-size: 13px;
  text-align: center;
  margin-top: 14px;
  color: #334155;

  span {
    color: #2563eb;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Error = styled.p`
  text-align: center;
  background: rgba(220,38,38,0.08);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(220,38,38,0.18);
  font-size: 13px;
  color: #dc2626;
  margin-bottom: 12px;
`;

function Signup({ onSignupOtpSent, goToLogin }) {
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("⚠ Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if(!res.ok) return setError(data.message || "Signup failed");

      localStorage.setItem("authEmail", email);
      onSignupOtpSent();
      
    } catch {
      setError("Server error 😢 Try again.");
    }

    setLoading(false);
  };

  return (
    <Background>
      <GlassCard>
        <Title>Create Account</Title>

        {error && <Error>{error}</Error>}

        <InputGroup>
          <StyledInput placeholder=" " value={name} onChange={e=>setName(e.target.value)} />
          <FloatingLabel>Full Name</FloatingLabel>
        </InputGroup>

        <InputGroup>
          <StyledInput placeholder=" " type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <FloatingLabel>Email</FloatingLabel>
        </InputGroup>

        <InputGroup>
          <StyledInput placeholder=" " type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <FloatingLabel>Password</FloatingLabel>
        </InputGroup>

        <Button onClick={handleSignup}>
          {loading ? "Sending OTP..." : "Continue"}
        </Button>

        <SwitchText>
          Already have an account? <span onClick={goToLogin}>Sign In</span>
        </SwitchText>
      </GlassCard>
    </Background>
  );
}

export default Signup;
