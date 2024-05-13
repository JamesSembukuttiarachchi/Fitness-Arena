import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <div className="container">
        <Link to={`/view/`}>
          <button className="btn btn-primary">View Cards</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
