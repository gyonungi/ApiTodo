
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todo,setTodos] = useState([])
  const [text,setText] = useState('')
  const [message,setMessage] = useState('')
  const handleClick = () => {
    // 👇️ clear input value
    setMessage('');
  };
  const objectToArray = (data) =>{
    return Object.keys(data).map(()=>{
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
  function handleDell(e,id){
    e.preventDefault()
      removeTask()
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
  let getTodo = objectToArray(todo);
  console.log(getTodo?.[0]?.todos);
  const removeTask = async (id) =>{
    const res = await fetch (`https://webdev-hw-api.vercel.app/api/todos/${getTodo?.[0]?.todos?.[0]?.id}`,{
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
  
    const [sortusers, setSortUsers] = useState(null);
    function numDescending() {
      getTodo?.[0]?.todos?.sort((a,b)=> b?.id - a?.id)
      return setSortUser(getTodo)
    }
    const [sortuser, setSortUser] = useState(null);
    function numAscending(){
      getTodo?.[0]?.todos?.sort((a,b) => a?.id - b?.id);
      return setSortUser(getTodo)
    }
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
          <button onClick={handleClick}>Очистить поле</button>
        </form>
      </div>
      <div>
        <p>Сортировка</p>
      <button   onClick={numDescending}>Вниз</button>
      <button   onClick={numAscending}>Вверх</button>
        {getTodo?.[0]?.todos?.map((item)=> 
          <li key={item.id}>{item?.text}</li>
        
        )}
      </div>
    </>
  );
}

export default App;
