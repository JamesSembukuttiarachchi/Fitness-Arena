import express from 'express';
import { createWorkout , getWorkout, getWorkouts} from '../Controllers/workoutController';


const router = express.Router()

//GET all workouts
router.get('/', getWorkouts)

//GEt a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a new workout
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE workout'})
})

//UPDATE a new workout
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE workout'})
})

export default router

