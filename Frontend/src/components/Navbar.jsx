import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Workout Tracker</h2>
        </Link>
        <nav>
          <div>
            <Link to="/notifications"> Notifications</Link>
          </div>
        </nav>
        <nav>
          <div>
            <Link to="/userprofile"> My Profile</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
