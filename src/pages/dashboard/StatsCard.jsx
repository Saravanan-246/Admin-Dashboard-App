import styled from "styled-components";

const Card = styled.div`
  background: white;
  padding: 22px;
  border-radius: 16px;
  width: 230px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  text-align: left;
`;

const Label = styled.p`
  color: #64748b;
  font-size: 14px;
`;

const Number = styled.h3`
  margin: 5px 0;
  font-size: 30px;
  font-weight: 600;
`;

export default function StatsCard({ title, value }) {
  return (
    <Card>
      <Label>{title}</Label>
      <Number>{value}</Number>
    </Card>
  );
}
