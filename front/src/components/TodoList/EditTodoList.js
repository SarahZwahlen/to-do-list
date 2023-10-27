import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { EditTask } from "../Task/EditTask";

export function EditTodoList() {
  const { list_id } = useParams();

  console.log(list_id);
  const [list_data, setListData] = useState({ title: "" });
  const [tasks, setTasks] = useState([]);

  const [newTodo, setNewTodo] = useState({
    title: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/task-list/all-tasks-of-list/${list_id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setListData({ title: data.data.title });
        setTasks(data.data.tasks);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDeleteList = () => {
    fetch("http://localhost:3000/task-list", {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({ taskListId: list_id }),
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => navigate("/"))
      .catch((err) => console.log(err));
  };

  const handleNewTodo = (e) => {
    if ((e.key === "Enter" || e.type === "click") && newTodo.title.length > 0) {
      fetch("http://localhost:3000/task-list/add-task", {
        method: "PUT",
        body: JSON.stringify({
          taskListId: list_id,
          ...newTodo,
        }),
        credentials: "include",
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setTasks([data.data.task, ...tasks]);
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
          setTasks(tasks.filter((todo) => todo.id !== id));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="new_list_container">
      <div className="card">
        <div className="list_todo_container">
          <div className="list_todo_header">
            <h1>{list_data.title}</h1>
            <button
              className="p-error secondary-button"
              onClick={handleDeleteList}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <aside className="new_todo">
          <div className="card todo_card">
            <div className="todo_input_container">
              <div className="checkbox_container">
                <div className="checkbox"></div>
              </div>
              <input
                type="text"
                placeholder="Create a new todo.."
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, title: e.target.value })
                }
                onKeyDown={handleNewTodo}
              ></input>
            </div>
            <div className="input_icon">
              <i className="fa-solid fa-plus" onClick={handleNewTodo}></i>
            </div>
          </div>
          <div className="todo_list_container">
            {tasks.map((item) => (
              <div className="card todo_card" key={item._id}>
                <EditTask model={item} />
                <button className="input_icon secondary-button">
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => handleDelete(item._id)}
                  ></i>
                </button>
              </div>
            ))}
          </div>
          <p>{tasks.length} item</p>
        </aside>
      </div>
    </section>
  );
}
