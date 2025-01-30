import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log(formData)
    axios.post('http://localhost:5000/user/register', formData)
    .then((res) => {
        console.log(res)
        alert(res.data.msg)
        navigate("/login")
    })
    .catch((err) => {
        console.log(err)
    })  
   
   
  };

  return (
    <Container>
      <Title>Signup</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="NAME"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="email"
          placeholder="MAIL ID"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Signup</Button>
      </Form>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 25px auto;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 5px 22px rgba(19, 9, 9, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 50px;
  font-size: 40px;
  color:rgb(115, 43, 97);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    border-color:rgb(120, 48, 122);
    background-color: rgb(0,0,0);
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color:rgb(91, 24, 74);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.5s ease, transform 0.4s ease;

  &:hover {
    background-color:rgb(122, 79, 117);
    transform: translateY(-3px);
  }
`;

const ErrorMessage = styled.p`
  color:rgb(248, 0, 0);
  font-size: 20px;
`;
