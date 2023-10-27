import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { LOG_IN } from "../../store/reducer/userReducer";

import "../../assets/style.scss";

export function Login() {
  const [user_data, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setErrors] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify(user_data),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.data.isLogged) {
          dispatch(LOG_IN(res.data.user));
          navigate("/");
        } else {
          setErrors("Wrong email or password");
        }
      })
      .catch((error) => console.log("ere"));
  };

  return (
    <section className="login_container">
      <div className="card">
        <h2>Welcome</h2>
        <form>
          <div className="login">
            <label>Email address</label>
            <input
              type="text"
              placeholder="test@mail.com"
              value={user_data.email}
              onChange={(e) =>
                setUserData({ ...user_data, email: e.target.value })
              }
            ></input>
          </div>
          <div className="login">
            <label>Password</label>
            <input
              type="password"
              placeholder="your secret password"
              value={user_data.password}
              onChange={(e) =>
                setUserData({ ...user_data, password: e.target.value })
              }
            ></input>
          </div>
          {error.length > 0 && <p className="p-error">{error}</p>}
          <div className="button_container">
            <button className="button-89" onClick={handleSubmit}>
              Log in
            </button>
          </div>
        </form>
        <p>
          Don't have an account ?{" "}
          <Link to="/new_user" className="link">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
