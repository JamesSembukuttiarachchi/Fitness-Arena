import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
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
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="grid grid-cols-3 gap-4">
        <div className="section1">
          <div className="workouts">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </div>
        </div>

        <div className="section2">
          <div>
            <WorkoutForm />
          </div>
          <div>Diet Plan</div>
          <div className="Breakfast w-96 h-60 relative bg-white rounded-lg">
            <div className="Frame66 px-5 py-2 left-[20px] top-[14px] absolute bg-neutral-100 rounded-lg justify-start items-center gap-36 inline-flex">
              <div className="Breakfast text-indigo-400 text-base font-bold font-['Manrope'] leading-normal">
                Breakfast
              </div>
              <div className="00Am text-neutral-950 text-xs font-semibold font-['Manrope'] leading-none">
                10:00 am
              </div>
            </div>
            <div className="Frame62 w-16 h-16 left-[20px] top-[67px] absolute rounded-full justify-center items-center inline-flex">
              <img
                className="Image w-32 h-24"
                src="https://via.placeholder.com/131x89"
              />
            </div>
            <div className="Frame64 w-16 h-16 left-[20px] top-[151px] absolute rounded-full">
              <img
                className="Image w-32 h-24 left-[-33px] top-[-12px] absolute"
                src="https://via.placeholder.com/131x89"
              />
              <img
                className="JoannaKosinska7ludryzfbbeUnsplash1 w-28 h-20 left-[-5px] top-[-6px] absolute"
                src="https://via.placeholder.com/111x75"
              />
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

        <div className="section3">
          <div>
            <h1>Goals</h1>
            <div className="Running w-80 h-16 relative">
              <div className="Rectangle w-80 h-16 left-0 top-0 absolute bg-white rounded-lg" />
              <div className="Running left-[74px] top-[11px] absolute text-slate-900 text-base font-semibold font-['Manrope']">
                Running
              </div>
              <div className="Km80km left-[74px] top-[37px] absolute text-slate-400 text-sm font-normal font-['Manrope']">
                70km/80km
              </div>
              <div className="Ellipse w-11 h-11 left-[12px] top-[12px] absolute bg-slate-100 rounded-full" />
              <img
                className="Image w-11 h-11 left-[55px] top-[14px] absolute origin-top-left rotate-180"
                src="https://via.placeholder.com/46x46"
              />
              <div className="Ellipse w-10 h-10 left-[241px] top-[13px] absolute rounded-full border-2 border-neutral-100" />
              <div className="Ellipse w-0.5 h-0.5 left-[261px] top-[12px] absolute bg-white rounded-full" />
              <div className=" left-[249px] top-[25px] absolute text-slate-900 text-xs font-semibold font-['Manrope']">
                79%
              </div>
            </div>
            <div className="Running w-80 h-16 relative">
              <div className="Rectangle w-80 h-16 left-0 top-0 absolute bg-white rounded-lg" />
              <div className="Running left-[74px] top-[11px] absolute text-slate-900 text-base font-semibold font-['Manrope']">
                Running
              </div>
              <div className="Km80km left-[74px] top-[37px] absolute text-slate-400 text-sm font-normal font-['Manrope']">
                70km/80km
              </div>
              <div className="Ellipse w-11 h-11 left-[12px] top-[12px] absolute bg-slate-100 rounded-full" />
              <img
                className="Image w-11 h-11 left-[55px] top-[14px] absolute origin-top-left rotate-180"
                src="https://via.placeholder.com/46x46"
              />
              <div className="Ellipse w-10 h-10 left-[241px] top-[13px] absolute rounded-full border-2 border-neutral-100" />
              <div className="Ellipse w-0.5 h-0.5 left-[261px] top-[12px] absolute bg-white rounded-full" />
              <div className=" left-[249px] top-[25px] absolute text-slate-900 text-xs font-semibold font-['Manrope']">
                79%
              </div>
            </div>
            <div className="Running w-80 h-16 relative">
              <div className="Rectangle w-80 h-16 left-0 top-0 absolute bg-white rounded-lg" />
              <div className="Running left-[74px] top-[11px] absolute text-slate-900 text-base font-semibold font-['Manrope']">
                Running
              </div>
              <div className="Km80km left-[74px] top-[37px] absolute text-slate-400 text-sm font-normal font-['Manrope']">
                70km/80km
              </div>
              <div className="Ellipse w-11 h-11 left-[12px] top-[12px] absolute bg-slate-100 rounded-full" />
              <img
                className="Image w-11 h-11 left-[55px] top-[14px] absolute origin-top-left rotate-180"
                src="https://via.placeholder.com/46x46"
              />
              <div className="Ellipse w-10 h-10 left-[241px] top-[13px] absolute rounded-full border-2 border-neutral-100" />
              <div className="Ellipse w-0.5 h-0.5 left-[261px] top-[12px] absolute bg-white rounded-full" />
              <div className=" left-[249px] top-[25px] absolute text-slate-900 text-xs font-semibold font-['Manrope']">
                79%
              </div>
            </div>
          </div>
          <div>
            <h1>Trainer Details</h1>
            <div className="Trainer w-72 h-40 relative bg-white rounded-lg">
              <div className="Rectangle w-12 h-12 left-[30px] top-[63px] absolute bg-white rounded-lg" />
              <div className="Image w-11 h-11 left-[30px] top-[29px] absolute rounded-md">
                <div className="Rectangle46 w-11 h-11 left-0 top-0 absolute bg-orange-400 bg-opacity-30 rounded-md" />
                <img
                  className=" w-20 h-24 left-[-19px] top-0 absolute"
                  src="https://via.placeholder.com/73x94"
                />
              </div>
              <div className="CameronWilliamson left-[30px] top-[96px] absolute text-neutral-950 text-base font-semibold font-['Manrope'] leading-normal">
                Cameron Williamson
              </div>
              <div className="FitnessSpecialist left-[30px] top-[123px] absolute text-zinc-500 text-sm font-medium font-['Manrope'] leading-tight">
                Fitness Specialist
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
