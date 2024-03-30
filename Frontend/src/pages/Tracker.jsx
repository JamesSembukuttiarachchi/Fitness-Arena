import { useEffect, useState } from "react";

const Tracker = () => {

    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                setWorkouts(json)
            }
        }
        fetchWorkouts();
    }, []);

    return (
        <div className="Tracker">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <p key={workout._id}>{workout.title}</p>
                ))}
            </div>
        </div>
    )
}

export default Tracker;