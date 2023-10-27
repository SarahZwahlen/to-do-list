import { useState } from "react";

export function EditTask({model}) {
  const [editTodo, setEditTodo] = useState({
    title: model.title,
    id: model._id,
    isCompleted: model.isCompleted
  })
  const [clicked, setClicked] = useState(false)

  const handleEdit = (e) => {
    if (e.key === 'Enter' && editTodo.title !== model.title ) {
      fetch('http://localhost:3000/task', {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(editTodo),
        headers: {'content-type': 'application/json'}
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setClicked(false)
        })
        .catch(err => console.error(err))
    }
  }
  const handleComplete = () => {
    setEditTodo({
      ...editTodo,
      isCompleted: editTodo.isCompleted? false : true
    })
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
  return(
      <div className="todo_input_container">
        <div className="checkbox_container" onClick={handleComplete}>
          {editTodo.isCompleted && <span className="checkbox active"><i className="fa-solid fa-check"></i></span>}
          {!editTodo.isCompleted && <span className="checkbox inactive"></span>}
        </div>
        <input type='text' disabled={!clicked} value={editTodo.title} onChange={(e) => setEditTodo({...editTodo, title: e.target.value})} onKeyDown={handleEdit}></input>
        <div className="input_icon">
          {!clicked && <i className="fa-solid fa-pen-to-square" onClick={() => setClicked(true)}></i>}
        </div>
        
      </div>
  )

}