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
                <h1><strong>
                  Welcome Back <span> {user.username} </span>
                </strong></h1>
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
