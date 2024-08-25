import express from 'express';
const router = express.Router();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../mongo/models/User.js';
//import Cuser from "../mongo/models/Cuser.js";
// import { Caterer } from '../models/Cuser.js';
//import {dishavail,Cater} from  '../mongo/models/Cater.js';
import Caterers from '../mongo/models/Caterer.js';
import Caterer from '../mongo/models/Caterer.js';
router.get("/",(req,res)=>{
    res.send("User API");
});
// user signup
router.post("/usignup", async(req, res) => {
    try {
        console.log(req.body)
        const user = await User.create(
        {...req.body, password: bcrypt.hashSync(req.body.password, 10)}
        );
        res.status(201).json({ user:user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
// cuser signup
router.post("/csignup2", async(req, res) => {
    console.log("req.body");
    const { cname,caddress,dish,email,ph,password } = req.body;
    try {
        console.log("hii")
       
        const salt = bcrypt.genSaltSync(10)
        const user = await Caterers.create(
            {cname:cname,caddress:caddress,dish:dish,email:email,ph:ph,password:password,count:0}
        );
        console.log(user)

      
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
//  user delete
router.delete("/udelete/:id",async(req,res)=>{
    try{
        const user = await User.findOneAndDelete({username:req.params.id});
        if(!user){
            return res.status(404).json({error:"Not Found"});
        }else{
            console.log("User deleted");
            res.status(200).json(user);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
});

router.delete("/cdelete/:id",async(req,res)=>{
    try{
        const user = await Caterers.findOneAndDelete({c_username:req.params.id});
        if(!user){
            return res.status(404).json({error:"Not Found"});
        }else{
            console.log("User deleted");
            res.status(200).json(user);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
});
//  user login
router.post("/ulogin",async (req,res)=>{
    try{
        console.log(req.body)
        const {username,password} = req.body;
        const auth = await User.findOne({username: username});
        console.log(auth)
        if (auth){
            if(bcrypt.compareSync(password,auth.password)){
                const token = jwt.sign({id:auth._id},"secret-key");
                res.status(200).json({auth:auth._id,token:token,username:username});
                
            }
            else{
            res.status(500).json({message:"Invalid Password"});
            }
        }
        else{
            res.status(500).json({message:"Invalid Email"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})

// cuser login
router.post("/clogin2",async (req,res)=>{
    try{
        const cname=req.body.username
        const password=req.body.password
        console.log(req.body)
       console.log(cname)
        const auth = await Caterers.findOne({cname,password});
        console.log(auth)
        if (auth){
                const token = jwt.sign({id:auth._id},"secret-key");
                res.status(200).json({auth:auth._id,token:token});
                console.log(auth)
                
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
})
//fill
router.post("/fill",async (req,res)=>{
    console.log(req.body)
    const uid=req.body.uid
    const dish=req.body.dish
    const price=req.body.price
    const count=req.body.maxcount
    try {
        console.log("hii")
        const user=await Caterer.updateOne({_id:uid},{"$push":{dishavail:{name:dish,price:price}}})
        const user2= await Caterer.updateOne({_id:uid},{count:count})
        console.log(user)
        console.log(user2)
    } catch (error) {
        
    }
})
// user secret route
router.get("/ulogin",async (req,res)=>{
    if (req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"secret-key",(err,decoded)=>{
            if(err){
                res.status(401).json({error:"Invalid Token"});
            }
            else{
                res.status(200).json({message:"Authorized"})
            }
        })
    }
    else{
        res.status(401).json({error:"Token not provided"});
    }   
}
);

router.get("/clogin",async (req,res)=>{
    if (req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"secret-key",(err,decoded)=>{
            if(err){
                res.status(401).json({error:"Invalid Token"});
            }
            else{
                res.status(200).json({message:"Authorized"})
            }
        })
    }
    else{
        res.status(401).json({error:"Token not provided"});
    }
});
// user profile
router.get("/uprofile/:id",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.params.id});
        if(!user){
            console.log("User not found");
            res.status(404).json({error:"Not Found"});
        }else{
            res.status(200).json(user);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
});

router.get("/cprofile/:id",async(req,res)=>{
    try{
        const user = await Caterers.findOne({c_username:req.params.id});
        if(!user){
            return res.status(404).json({error:"Not Found"});
        }
        else{
            res.status(200).json(user);
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});
export default router;