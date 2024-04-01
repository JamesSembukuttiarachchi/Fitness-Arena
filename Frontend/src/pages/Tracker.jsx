import { useEffect, useState } from "react";
import axios from "axios";

const Tracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //const fetchWorkouts = async () => {
    setLoading(true);
    axios
      .get("http://localhost:6005/api/workouts")
      .then((response) => {
        setWorkouts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Tracker">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <p key={workout._id}>{workout.title}</p>)}
      </div>
    </div>
  );
};

export default Tracker;
