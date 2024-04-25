import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <nav>
          {user && (
            <>
              <Link to="/">
                <h2>
                  Welcome back <span> {user.email} </span>{" "}
                </h2>
                <span>
                  <div>
                    <button onClick={handleClick}>Log out</button>
                  </div>
                </span>

                <div>
                  <Link to="/userprofile">{user.username}</Link>
                </div>
              </Link>
            </>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
