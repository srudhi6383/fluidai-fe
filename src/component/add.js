import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
export const AddTaskdata = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const handleAddTask = (e) => {
    console.log(newTask);

    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/task/create", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <Container>
      <h1>Add Task</h1>
      <AddTaskForm onSubmit={handleAddTask}>
        <Input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Title"
        />
        <TextArea
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Task Description"
        />
        <Input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value.split("T")[0] })}
        />
        <Button type="submit">Add Task</Button>
      </AddTaskForm>
    </Container>
  );
};

const Container = styled.div`
  width: 40%;
  margin: auto;
  padding: 20px;
  text-align: center;
`;
const AddTaskForm = styled.form`
 width:95%; 
 margin:auto;
  
  
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 5px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 50px;
  
  margin-top:10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  padding: 10px;
  margin-top: 10px;
  background-color: cyan;

  border: none;
  border-radius: 5px;
  cursor: pointer;
`;