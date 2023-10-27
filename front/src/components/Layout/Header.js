import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT } from "../../store/reducer/userReducer";

export function Header() {
  const isLogged = useSelector((state) =>
    state.user.hasOwnProperty("current_user")
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    fetch("http://localhost:3000/user/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User is deconnected") {
          dispatch(LOG_OUT());
          navigate("/");
          // window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <header>
      <div className="nav_container">
        <Link to="/" className="link">
          <h1>TODO APP</h1>
        </Link>
        {isLogged && (
          <div className="logged_icons">
            <button>
              <i
                className="fa-solid fa-door-closed icon"
                onClick={handleLogOut}
              ></i>
            </button>
            <button>
              <i
                className="fa-solid fa-gear"
                onClick={() => navigate("/settings")}
              ></i>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
