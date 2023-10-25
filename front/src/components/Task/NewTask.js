
import { useState } from "react"

export function NewTask() {
  const [newTodo, setNewTodo] = useState({
    description: "",
    completed: false
  })
  const [todoList, setTodoList] = useState([])
  const handleNewTodo = (e) => {
    if(e.key === 'Enter' && newTodo.description.length>0) {
      console.log("here")
      fetch('http://localhost:3000/task/create', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {'content-type': 'application/json'}
      })
        .then(res => res.json())
        .then(data => console.log(data))
      // setTodoList([ newTodo, ...todoList])
      // setNewTodo({
      //   description: '',
      //   completed: false
      // })
    }
    
  }
  return (
    <section className="new_todo">
      <div className="card todo_card">
        <div className="todo_input_container">
          <div className="checkbox"></div>
          <input placeholder="Create a new todo.." value={newTodo.description} onChange={(e) => setNewTodo({...newTodo, description: e.target.value})} onKeyDown={handleNewTodo}></input>
        </div>
        <div>
          <i className="fa-solid fa-paper-plane"></i>
        </div>
      </div>
      {todoList.map(item => 
        <div className="card todo_card">
          <div className="todo_input_container">
            <div className="checkbox"></div>
            <p>{item.description}</p>
          </div>
          <div>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </section>
  )
}