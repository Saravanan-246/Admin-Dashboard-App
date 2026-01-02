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

const GlassCard = styled.div`
  width: 100%;
  max-width: 380px;
  padding: 28px 26px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.45);
  box-shadow: 0px 16px 30px rgba(0,0,0,0.06);
  backdrop-filter: blur(12px);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
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
  color: #0f172a;
  outline: none;
  transition: 0.3s;

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
  margin-top: 6px;
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

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #334155;

  span {
    color: #2563eb;
    font-weight: 600;
    cursor: pointer;

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
  border: 1px solid rgba(220,38,38,0.15);
  font-size: 13px;
  color: #dc2626;
  margin-bottom: 12px;
`;

function Login({ onLoginOtpSent, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!email || !password) {
      setError("⚠ Please fill all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("authUserId", data.userId);
        localStorage.setItem("authEmail", email);
        localStorage.setItem("authMode", "login");
        onLoginOtpSent();
      }
    } catch {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNext();
  };

  return (
    <Background>
      <GlassCard>
        <Title>Admin Login</Title>

        {error && <Error>{error}</Error>}

        <InputGroup>
          <StyledInput
            placeholder=" "
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <FloatingLabel>Email</FloatingLabel>
        </InputGroup>

        <InputGroup>
          <StyledInput
            placeholder=" "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <FloatingLabel>Password</FloatingLabel>
        </InputGroup>

        <Button onClick={handleNext} disabled={loading}>
          {loading ? "Sending OTP..." : "Continue"}
        </Button>

        <SwitchText>
          Don&apos;t have an account? <span onClick={goToSignup}>Sign Up</span>
        </SwitchText>
      </GlassCard>
    </Background>
  );
}

export default Login;
