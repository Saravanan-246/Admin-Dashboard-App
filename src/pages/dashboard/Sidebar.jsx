import styled from "styled-components";
import { FiHome, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background: #1e293b;
  color: white;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h2`
  font-size: 22px;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 600;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: #334155;
  }
`;

export default function Sidebar({ logout }) {
  return (
    <SidebarContainer>
      <Logo>Admin</Logo>

      <MenuItem><FiHome /> Dashboard</MenuItem>
      <MenuItem><FiUsers /> Users</MenuItem>
      <MenuItem><FiSettings /> Settings</MenuItem>

      <MenuItem style={{ marginTop: "auto", color: "#ef4444" }} onClick={logout}>
        <FiLogOut /> Logout
      </MenuItem>
    </SidebarContainer>
  );
}
