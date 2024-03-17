const router = require("express").Router();
let appointments =require("../models/appointment");

//create

router.route("/create").post((req,res)=>{

const userid = req.body.userid;
const firstname = req.body.firstname;
const lastname = req.body.lastname;
const trainername = req.body.trainername;
const date = Date(req.body.date);
const time = req.body.time;
const email = req.body.email;
const phone = Number(req.phone.phone);

const newappointment = new appointments({

     userid, 
     firstname, 
     lastname, 
     trainername, 
     date, 
     time,
     email, 
     phone 
})


new appointments.save().then(()=>{
   res.json("Appointment Booked")
}).catch((err)=>{
       console.log(err);

})

})

//view

router.route("/").get((req,res)=>{


appointments.save().then((appo)=>{
     res.json(appo)

}).catch((err)=>{
    console.log(err)
})

})

//update

router.route("/update/:id").put(async(req,res)=>{
let uid = req.params.id;
const userid = req.body.userid;
const firstname = req.body.firstname;
const lastname = req.body.lastname;
const trainername = req.body.trainername;
const date = Date(req.body.date);
const time = req.body.time;
const email = req.body.email;
const phone = Number(req.phone.phone);

const updateappo = {
   userid, 
   firstname, 
   lastname, 
   trainername, 
   date, 
   time,
   email, 
   phone 

}
const update = await appointments.findOneAndUpdate(userid,updateappo)
.then(()=>{
   res.status(200).send({status:"appointment updated",user:update})
}).catch((err)=>{

 console.log(err);
 res.status(500).send({status:"update Error"});

})

})

//delete


router.route("/delete/:id").delete(async(req,res)=>{

let userid = req.params.userid;
await appointment.findOneAndDelete(userid)
.then(()=>{
   res.status(200).send({status:"appointment deleted",user:update})
}).catch((err)=>{

 console.log(err);
 res.status(500).send({status:"delete Error"});

})



})

export default router

