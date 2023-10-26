import { useState } from "react"
import { NewTask } from "../Task/NewTask"

import { useNavigate } from "react-router-dom"

export function NewTodoList () {
  const [task_list, setTaskList] = useState({
    title: ''
  })
  const [isCreated, setIsCreated] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = () => {
    fetch('http://localhost:3000/task-list/create', {
      method: 'POST',
      credentials: 'include',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(task_list)
    })
    .then(response => response.json())
    .then(data => {
      if (data.data) {
        setTaskList(data.data)
        setIsCreated(true)
      }
    })
    .catch(err => console.log(err))
  }
  const handleDelete = () => {
    fetch('http://localhost:3000/task-list', {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({taskListId: task_list.id}),
      headers: { 'content-type': 'application/json'}
    })
      .then(res => res.json())
      .then(data => navigate('/'))
      .catch(err => console.log(err))
  }

  return ( 
    <section className="new_list_container">
      { !isCreated && <div className="card">
        <h1>Task title</h1>
        <input type='text' value={task_list.title} onChange={(e) => setTaskList({...task_list, title: e.target.value})}></input>
        <button className="button-89" onClick={handleSubmit}>Create</button>
      </div>
      }
      { isCreated && <div className="card">
        <div className="list_todo_header">
          <h1>{task_list.title}</h1>
          <p className='p-error' onClick={handleDelete}><i className="fa-solid fa-trash"></i></p>
        </div>
        <NewTask taskListId={task_list.id}/>
      </div>
      }


    </section>
  )
}