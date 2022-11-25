const express = require('express')
const router = express.Router()
const {users,createUser,getUsers,editUser,deleteUser} = require("../controllers/user")

router.get("/",users)

// routes
router.post("/create/user",createUser)
router.get("/users",getUsers)
router.patch("/user/:id",editUser)
router.delete("/user/:id",deleteUser)


module.exports = router;