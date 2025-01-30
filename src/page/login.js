import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5000/user/login", formData)
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
        localStorage.setItem("token", res.data.token);
         navigate("/add");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <Container>
      <Title>Login</Title>
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" >Login</Button>
      </Form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 28px;
  color:rgb(142, 26, 115);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f2f2f2;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    background-color: #fff;
  }
`;

const Button = styled.button`
  padding: 14px;
  background-color:rgb(175, 76, 170);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color:rgb(78, 23, 74);
    transform: translateY(-2px);
  }
`;
