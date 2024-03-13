import express from 'express';
import { workout } from '../Models/workoutModels.js';


const router = express.Router()

//GET all workouts
router.get('/', (req, res) => {
    res.json({msg: 'GET all workouts'})
})

//GEt a single workout
router.get('/:id', (req, res) => (
    res.json({msg: 'GET single workout'})
))

//POST a new workout
router.post('/', async (req, res) => {
    const {title, load, reps} = req.body

    try{
        const workout = await workout.create({title, load, reps})
        res.status(200).json(module)
    } catch (error){
        res.status(400).json({error: error.message})
    }

    res.json({msg: 'POST a new workout'})
})

//DELETE a new workout
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE workout'})
})

//UPDATE a new workout
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE workout'})
})

export default router

