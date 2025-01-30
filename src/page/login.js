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
    .post("http:localhost:5000/user/login", formData)
    .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
        localStorage.setItem("token",res.data.token);
        navigate("/add");
        setEmail("");
        setPassword("");
    })
    .catch((err)=> {
        alert(err.response.data.msg);

    })
}
     

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
  width: 50%;
  max-width: 200px;
  margin: 25px auto;
  padding: 20px;
  background-color:rgba(249, 249, 249, 0.34);
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(19, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 45px;
  font-size: 30px;
  color:rgb(78, 8, 62);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 25px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color:rgba(242, 242, 242, 0.47);

  &:focus {
    outline: none;
    border-color:rgb(3, 47, 4);
    background-color: #fff;
  }
`;

const Button = styled.button`
  padding: 14px;
  background-color:rgb(175, 76, 170);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color:rgb(78, 23, 74);
    transform: translateY(-1px);
  }
`;
