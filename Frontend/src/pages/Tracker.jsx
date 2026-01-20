import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaUser } from "react-icons/fa";
import trackerbg from "../assets/tracker-bg.jpeg";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import Layout from "../components/Layout/Layout";
import axios from "axios";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});

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
        setUserData(data.biodata.selectedWorkoutGoal);
        console.log();
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("An error occurred while fetching user data.");
      }
    };

    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:6005/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchUserId();
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <Layout>
      <div className="home bg-gray-300 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="section1">
            <div className="">
              <div className="workouts">
                {workouts &&
                  workouts.map((workout) => (
                    <div
                      key={workout._id}
                      className="bg-white rounded-lg shadow-md p-4 mb-4"
                    >
                      <WorkoutDetails workout={workout} />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="section2">
            <div>
              <WorkoutForm />
            </div>

            <div className="w-100 h-60 relative bg-white rounded-lg p-4">
              <div className="text-xl font-bold mb-6 text-center text-orange-500">
                Diet Plan
              </div>

              <div className="Frame66 px-5 py-2 left-[20px] top-[14px] absolute bg-neutral-100 rounded-lg justify-start items-center gap-36 inline-flex">
                <div className="Breakfast text-indigo-400 text-base font-bold font-['Manrope'] leading-normal">
                  Breakfast
                </div>
                <div className="00Am text-neutral-950 text-xs font-semibold font-['Manrope'] leading-none">
                  10:00 am
                </div>
              </div>
              <div className="Frame62 w-16 h-16 left-[20px] top-[67px] absolute rounded-full justify-center items-center inline-flex">
                <img />
              </div>
              <div className="Frame64 w-16 h-16 left-[20px] top-[151px] absolute rounded-full">
                <img />
                <img />
              </div>
              <div className="AvocadoSalad left-[100px] top-[67px] absolute text-neutral-950 text-lg font-medium font-['Manrope'] leading-relaxed">
                Avocado salad
              </div>
              <div className="Blueberry left-[100px] top-[151px] absolute text-slate-900 text-lg font-semibold font-['Manrope']">
                Blueberry
              </div>
              <div className="Rectangle339 w-12 h-1.5 left-[100px] top-[120px] absolute bg-indigo-400 rounded-lg" />
              <div className="Rectangle342 w-12 h-1.5 left-[100px] top-[204px] absolute bg-indigo-400 rounded-lg" />
              <div className="Rectangle340 w-24 h-1.5 left-[151px] top-[120px] absolute bg-orange-400 rounded-lg" />
              <div className="Rectangle343 w-24 h-1.5 left-[151px] top-[204px] absolute bg-orange-400 rounded-lg" />
              <div className="Rectangle341 w-16 h-1.5 left-[245px] top-[120px] absolute bg-rose-400 rounded-lg" />
              <div className="Rectangle344 w-16 h-1.5 left-[245px] top-[204px] absolute bg-rose-400 rounded-lg" />
              <div className="Carbs left-[100px] top-[99px] absolute justify-start items-center gap-1 inline-flex">
                <div className="Ellipse36 w-1 h-1 bg-indigo-400 rounded-full" />
                <div className="Carbs text-slate-400 text-xs font-normal font-['Manrope'] leading-3">
                  8% carbs
                </div>
              </div>
              <div className="Carbs left-[100px] top-[182px] absolute justify-start items-center gap-1 inline-flex">
                <div className="Ellipse36 w-1 h-1 bg-indigo-400 rounded-full" />
                <div className="Carbs text-slate-400 text-xs font-normal font-['Manrope'] leading-3">
                  8% carbs
                </div>
              </div>
              <div className="Protein left-[174px] top-[99px] absolute justify-start items-center gap-0.5 inline-flex">
                <div className="Ellipse37 w-1 h-1 bg-orange-400 rounded-full" />
                <div className="Protein text-slate-400 text-xs font-normal font-['Manrope'] leading-3">
                  16% protein
                </div>
              </div>
              <div className="Protein left-[174px] top-[182px] absolute justify-start items-center gap-0.5 inline-flex">
                <div className="Ellipse37 w-1 h-1 bg-orange-400 rounded-full" />
                <div className="Protein text-slate-400 text-xs font-normal font-['Manrope'] leading-3">
                  16% protein
                </div>
              </div>
              <div className="Frame63 left-[261px] top-[99px] absolute justify-start items-center gap-0.5 inline-flex">
                <div className="Ellipse38 w-1 h-1 bg-rose-400 rounded-full" />
                <div className="Fat text-slate-400 text-xs font-normal font-['Manrope'] leading-3">
                  6% Fat
                </div>
              </div>
              <div className="Fat left-[261px] top-[182px] absolute justify-start items-center gap-0.5 inline-flex">
                <div className="Ellipse38 w-1 h-1 bg-rose-400 rounded-full" />
                <div className="Fat text-slate-400 text-xs font-normal font-['Manrope'] leading-3">
                  6% Fat
                </div>
              </div>
            </div>
          </div>
          {/*Wk Goals*/}
          <div className="section3">
            <div className="w-100 h-200 relative bg-white rounded-lg p-4 mb-4">
              <h1 className="text-xl font-bold mb-6 text-center text-orange-500">
                Workout Goal
              </h1>
              <div className="font-bold mb-2">{userData.goal}</div>
              <div className="flex">
                <div>{userData.description}</div>
                <div><img src={userData.photoURL} alt="" /></div>
              </div>
            </div>
            <div className="w-100 h-200 relative bg-white rounded-lg p-4">
              <h1 className="text-xl font-bold mb-6 text-center text-orange-500">
                Trainer Details
              </h1>
              <div className="Trainer w-72 h-40 relative bg-white rounded-lg">
                <div className="Rectangle w-12 h-12 left-[30px] top-[63px] absolute bg-white rounded-lg" />
                <div className="Image w-11 h-11 left-[30px] top-[29px] absolute rounded-md">
                  <FaUser className="text-5xl text-center" />
                </div>
                <div className="CameronWilliamson left-[30px] top-[96px] absolute text-neutral-950 text-base font-semibold font-['Manrope'] leading-normal">
                  Mr. Pasan Pabasara
                </div>
                <div className="FitnessSpecialist left-[30px] top-[123px] absolute text-zinc-500 text-sm font-medium font-['Manrope'] leading-tight">
                  Fitness Specialist, NSCA-CPT (Certified Personal Trainer)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
