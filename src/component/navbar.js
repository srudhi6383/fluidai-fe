import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Container>
      <Logo>TaskManager</Logo>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/signup">Signup</StyledLink>
      </NavLinks>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color:rgb(149, 174, 200);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 20px 30px;
  }
`;

const Logo = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 500px) {
    gap: 15px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color:rgb(69, 63, 9);
  }
`;
