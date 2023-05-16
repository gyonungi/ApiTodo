
import { useEffect, useState } from 'react';
import './App.css';
import { useParams } from 'react-router-dom';

function App() {
  const [todo,setTodos] = useState([])
  const [text,setText] = useState('')
  const params = useParams();
  const objectToArray = (data) =>{
    return Object.keys(data).map((key)=>{
      return{
        ...data
      }
    })
  }
  function handle (e){
    e.preventDefault()
    let dto ={
      text
    }
    addTask(dto)
  }
  function handleDell(e){
    e.preventDefault()
      removeTask(params.id)
  }
  const getTask = async ()=>{
    const res = await fetch (`https://webdev-hw-api.vercel.app/api/todos`,{
      method:"GET",
      headers:{
        'Content-Type': 'application/json'
      },
    })
    const todo = await res.json();
    setTodos(todo);
  }
  const addTask = async (dto) => {
    const res = await fetch (`https://webdev-hw-api.vercel.app/api/todos`,{
      method:"POST",
      body: JSON.stringify(dto),
    })
    const todo = await res.json()
    setTodos(todo)
  }
  const removeTask = async (id) =>{
    const res = await fetch (`https://webdev-hw-api.vercel.app/api/todos/${id}`,{
      method: "DELETE",
      headers: { "content-type": "application/json" 
  },
    });
    const todo = await res.json()
    setTodos(todo);
  }
    useEffect(()=>{
      getTask();
    },[])
  
    let getTodo = objectToArray(todo);
    console.log(getTodo?.[0]?.todos);
  return (
    <>
      <h2 >Список задач 🔍</h2>
      <div >
        <form>
          <input
         onChange={(e)=>setText(e.target.value)}
            placeholder="Новая задача"
            name="search"
            type="text"
          />
          <button onClick={(e) => handle(e)}>Добавить задачу</button>
          <button onClick={(e) =>handleDell(e)}>Удалить задачу</button>
        </form>
      </div>
      <div>
        {getTodo?.[0]?.todos?.map((item)=> 
          <li key={item.id}>{item?.text}</li>
        
        )}
      </div>
    </>
  );
}

export default App;
