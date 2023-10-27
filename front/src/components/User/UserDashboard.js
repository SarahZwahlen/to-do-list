import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../../assets/style.scss";
import { LOG_OUT } from "../../store/reducer/userReducer";
import { LOG_IN } from "../../store/reducer/userReducer";

export function UserDashboard() {
  const current_user = useSelector((state) => state.user.current_user);
  const [editUser, setEditUser] = useState(current_user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    fetch("http://localhost:3000/user", {
      method: "PUT",
      body: JSON.stringify(editUser),
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "User update failed") {
          const { password, ...editedUser } = editUser;
          setEditUser(data.data);
          dispatch(LOG_IN(editedUser));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    fetch("http://localhost:3000/user", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User has been deleted") {
          dispatch(LOG_OUT());
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="user_dashboard_container card">
      <h2>Change your account details</h2>
      <section>
        <div className="settings_input_container">
          <label>First Name : </label>
          <input
            value={editUser.firstname}
            onChange={(e) =>
              setEditUser({ ...editUser, firstname: e.target.value })
            }
          ></input>
        </div>
        <div className="settings_input_container">
          <label>Last Name : </label>
          <input
            value={editUser.surname}
            onChange={(e) =>
              setEditUser({ ...editUser, surname: e.target.value })
            }
          ></input>
        </div>
        <div className="settings_input_container">
          <label>Email : </label>
          <input
            type="email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          ></input>
        </div>
        <div className="settings_input_container">
          <label>Password : </label>
          <input
            type="password"
            value={editUser.password}
            onChange={(e) =>
              setEditUser({ ...editUser, password: e.target.value })
            }
          ></input>
        </div>
        <button className="button-89" onClick={handleEdit}>
          Submit
        </button>
      </section>
      <div className="settings">
        <button className="secondary-button" onClick={() => navigate("/")}>
          Go back home
        </button>
        <button className=" secondary-button p-error" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i> Delete my account
        </button>
      </div>
    </div>
  );
}
