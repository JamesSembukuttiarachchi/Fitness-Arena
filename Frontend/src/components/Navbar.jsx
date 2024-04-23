import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Workout Tracker</h2>
        </Link>
        <nav>
          <div>
            <button onClick={handleClick}>Log out</button>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
