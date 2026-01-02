import React, { useState } from "react";
import styled from "styled-components";

const BG = styled.div`
  height: 100vh;
  display: flex;
  justify-content:center;
  align-items:center;
`;

const Box = styled.div`
  width: 350px;
  background:white;
  padding:30px;
  border-radius:16px;
  text-align:center;
`;

const OTPBox = styled.input`
  width: 45px;
  height: 50px;
  margin: 5px;
  font-size:22px;
  text-align:center;
  border:1px solid #cbd5e1;
  border-radius:10px;
`;

const Button = styled.button`
  width:100%;
  margin-top:20px;
  padding:12px;
  border:none;
  background:#2563eb;
  color:white;
  border-radius:10px;
`;

function VerifyOtp({ email, onOtpSuccess, goBack }) {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const verify = async () => {
    const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMsg(data.message);
    } else {
      setMsg("Verified ✔");
      onOtpSuccess();
    }
  };

  return (
    <BG>
      <Box>
        <h2>Enter OTP</h2>
        <p>OTP sent to {email}</p>

        <OTPBox maxLength={6} value={otp} onChange={(e)=>setOtp(e.target.value)} />

        <Button onClick={verify}>Verify</Button>
        
        <p style={{color:"red"}}>{msg}</p>
        <p style={{cursor:"pointer",color:"#2563eb"}} onClick={goBack}>← Back</p>
      </Box>
    </BG>
  );
}

export default VerifyOtp;
