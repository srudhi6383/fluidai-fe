import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const [editingTask, setEditingTask] = useState({});
  

  useEffect(() => {
    const token=localStorage.getItem("token")
    if(!token){
        navigate("/login")
    }
    else{
    fetchTasks();
    }
  }, []);

  const fetchTasks = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/task/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const handleUpdateTask = (task) => {
    setEditingTask(task)
  };
  const handleSaveTask=()=>{
    const token=localStorage.getItem("token")
    axios.patch(`http://localhost:5000/task/update/${editingTask._id}`,editingTask,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((res)=>{
        console.log(res.data)
        alert(res.data.msg)
        fetchTasks()
        setEditingTask({})
    })
  }

  const handleDeleteTask = (taskId) => {
    const token=localStorage.getItem("token")
    axios.delete(`http://localhost:5000/task/delete/${taskId}`,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((res)=>{
        console.log(res.data)
        alert(res.data.msg)
        fetchTasks()
    })
    .catch((err)=>{
        console.log(err)
    })
  };

  return (
    <Container>
        <Div>
           
      <Button onClick={() => navigate("/add")}><b>+</b> Add The Task</Button>
      </Div>
      <TaskList>
        {tasks.length > 0 &&
          tasks.map((task) => (
            editingTask._id===task._id?
            <TaskCard key={task._id}>
                <h3>Title : {editingTask.title}</h3>
                <Select value={editingTask.priority} onChange={(e)=>setEditingTask({...editingTask,priority:e.target.value})}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </Select>
                <Select value={editingTask.status} onChange={(e)=>setEditingTask({...editingTask,status:e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </Select>
                <Button onClick={()=>handleSaveTask()}>Save</Button>
            </TaskCard>
            :<TaskCard key={task._id}>
              <h3>Title : {task.title}</h3>
              <p>Description : {task.description}</p>
              <p>Due Date : {task.dueDate.split("T")[0]}</p>
              <p>Priority : {task.priority}</p>
              <p>Status : {task.status}</p>
              <Button onClick={()=>handleDeleteTask(task._id)}>Delete</Button>
              <Button onClick={()=>handleUpdateTask(task)}>Update</Button>
            </TaskCard>
          ))}
      </TaskList>
    </Container>
  );
};
export default Home;
const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 50px;
  text-align: center;
`;

const Div = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: right;
`;

const Button = styled.button`
  padding: 10px 55px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color:rgb(12, 75, 15);
    transform: translateY(-2px);
  }
`;

const TaskList = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 35px;
`;

const TaskCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 5px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.0);
  }

  h3 {
    color: #444;
  }

  p {
    color: #888;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 20px;
  font-size: 25px;
  color: #444;
`;

