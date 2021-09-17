const userModel = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


const bcryptjs = require("bcryptjs");

exports.signup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            msg:errors.array()
        })
    }
    userModel.findOne({email:email})
    .then((stud) => {
        if(stud){
            return res.status(409).json({
                msg:"student/teacher already exists"
            })
        }
    })
    .catch(err => console.log(err));

    bcryptjs.hash(password,12)
    .then((result) => {
        let signupCred = new userModel({
            name:req.body.name,
            email:email,
            password:result
        });
        return signupCred.save();
    })
    .then((stud) => {
        return res.status(201).json({
            msg:"student/teacher created successfully"
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let userId,studentData;
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            msg:errors.array()
        })
    }
    userModel.findOne({
        email:email
    })
    .then((stud) => {
        if(!stud){
            return res.status(404).json({
                msg:"student/teacher not found"
            })
        }
        userId = stud._id;
        studentData = stud;
        return bcryptjs.compare(password,stud.password)
    })
    .then((result) => {
        if(!result){
            return res.status(401).json({
                msg:"invalid Password"
            })
        }
        let token = jwt.sign({
            email:email,
            userId:userId
        },"supersecretsentence");
        return res.status(200).json({
            msg:"user authenticated successfully",
            token:token,
            status:200
        })
    })
    .catch((err) => {
        console.log(err);
    })
}
exports.isLoggedIn = (req,res,next) => {
    res.status(200).json({
        logged:true,
        status:200
    })
}