import { useState } from "react";

export function EditTask({model}) {
  const [editTodo, setEditTodo] = useState({
    title: model.title,
    id: model.id,
    isCompleted: model.isCompleted
  })

  const handleEdit = (e) => {
    if (e.key === 'Enter' && editTodo.title !== model.title) {
      fetch('http://localhost:3000/task', {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(editTodo),
        headers: {'content-type': 'application/json'}
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }
  }
  const handleComplete = () => {
    setEditTodo({
      ...editTodo,
      isCompleted: editTodo.isCompleted? false : true
    })
  }
  console.log(editTodo)
  return(
      <div className="todo_input_container">
        <div className="checkbox" onClick={handleComplete}></div>
        <input type='text' value={editTodo.title} onChange={(e) => setEditTodo({...editTodo, title: e.target.value})} onKeyDown={handleEdit}></input>
      </div>
  )

}