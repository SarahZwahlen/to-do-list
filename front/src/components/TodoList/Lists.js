import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { TodoList } from "./TodoList";

export function Lists() {
  const [user_todo_list, setUserTodoList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/task-list/all-users-lists", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserTodoList(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      {user_todo_list?.length > 0 && (
        <article className="grid_container">
          <h1>Your latest List</h1>
          <div className="grid">
            {user_todo_list.map((todo) => (
              <Link
                key={todo.id}
                className="link"
                to={`edit_todo_list/${todo.id}`}
              >
                <TodoList data={todo} />
              </Link>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
