import { useEffect, useState } from "react"

export function TodoList () {
  const [user_todo_list, setUserTodoList] = useState()

  useEffect(() => {
    console.log("hre")
    fetch('http://localhost:3000/task/all-user-tasks', {
      credentials: 'include',
      headers: { 'content-type': 'application/json'}
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }, [])
  return (
    <section>
      <h1>Your latest Task</h1>

    </section>
  )
}