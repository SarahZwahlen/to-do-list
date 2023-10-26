import { useState } from "react";

import { EditTask } from "../Task/EditTask";

export function NewTask({ taskListId }) {
  const [newTodo, setNewTodo] = useState({
    title: "",
  });
  const [editTodo, setEditTodo] = useState({});
  const [todoList, setTodoList] = useState([]);

  const handleNewTodo = (e) => {
    if ((e.key === "Enter" || e.type === "click") && newTodo.title.length > 0) {
      fetch("http://localhost:3000/task-list/add-task", {
        method: "PUT",
        body: JSON.stringify({
          taskListId: taskListId,
          ...newTodo,
        }),
        credentials: "include",
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setTodoList([data.data, ...todoList]);
          setNewTodo({ title: "" });
        });
    }
  };

  const handleDelete = (id) => {
    fetch("http://localhost:3000/task/delete", {
      method: "DELETE",
      body: JSON.stringify({ taskId: id }),
      credentials: "include",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Task has been deleted") {
          setTodoList(todoList.filter((todo) => todo.id !== id));
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section className="new_todo">
      <div className="card todo_card">
        <div className="todo_input_container">
          <div className="checkbox_container">
            <div className="checkbox"></div>
          </div>
          <input
            type="text"
            placeholder="Create a new todo.."
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            onKeyDown={handleNewTodo}
          ></input>
        </div>
        <div className="input_icon">
          <i className="fa-solid fa-plus" onClick={handleNewTodo}></i>
        </div>
      </div>
      <div className="todo_list_container">
        {todoList.map((item) => (
          <div className="card todo_card" key={item.id}>
            <EditTask model={item} />
            <div className="input_icon">
              <i
                className="fa-solid fa-xmark"
                onClick={() => handleDelete(item.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>

      <p>{todoList.length} item</p>
    </section>
  );
}
