import { useEffect, useState } from "react"

import { TodoList } from "./TodoList"

export function Lists () {
  const [user_todo_list, setUserTodoList] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/task-list/all-users-lists', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {

        setUserTodoList(data.data)
      })
      .catch(err => console.error(err))
    
  }, [])

  return (
    <section>
      {user_todo_list.length>0 && <aside>
        <h1>Your latest List</h1>
        <div>
          { user_todo_list.map(todo => <TodoList key={todo.id} data={todo} />)}
        </div>
      </aside>}
    </section>
  )
}