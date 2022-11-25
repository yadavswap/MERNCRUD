const User = require("../models/user")

// test
exports.users = (req,res)=>{

        res.send("hell  ssso")
    
}
// create 
exports.createUser = async(req,res)=>{
    try {
        // get data from body
        const {name,email} = req.body

        // to check if not empty
        if(!name || !email){
            throw new Error("Name and Email are Required")
        }
        // check user exists
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error("Email Already Exists")
        }
        // insert data in db
        const user = await User.create({name,email})
        res.status(201).json({
            success:true,
            message:"User create Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

// get all 
exports.getUsers = async(req,res)=>{
    try {

        // user find
        const users = await User.find()
        res.status(200).json({
            success:true,
            users
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

// edit
exports.editUser= async(req,res)=>{

    try {

        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({
        success:true,
        message:"User updated successfully"
    })
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
    
}

// delete
exports.deleteUser= async(req,res)=>{

    try {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)        
        res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
    
}