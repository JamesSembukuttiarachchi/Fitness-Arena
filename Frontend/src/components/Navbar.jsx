import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react"; 

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(
          `http://localhost:6005/api/users/${user.email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("An error occurred while fetching user data.");
      }
    };

    if (user) {
      fetchUserId();
    }
  }, [user]);

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
                <h1>
                  <strong>
                    Welcome Back <span> {username} </span>
                  </strong>
                </h1>
                <span>
                  <div>
                    <button onClick={handleClick}>Log out</button>
                  </div>
                </span>
                <div className="flex flex-row-reverse ">
                  <Link to="/userprofile">{username}</Link>
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
