const express = require("express")
const model = require("./user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const router = express.Router()

router.post("/", async (req,res,next) => {
    try {
        const {username, password, role} = req.body

        const newUser = await model.createUser({
            username,
            password: await bcrypt.hash(password, 1),
            role,
        })

        res.status(201).json(newUser)
    } catch(er){
        next(er)
    }
})

router.get("/username", async (req,res,next) => {
    const user = await model.findUser(req.body.username)
    res.json(user)
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await model.findUser(username)
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
        console.log(user)
		
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		
		const token = jwt.sign({
			userID: user.id,
			userRole: user.role,
		}, process.env.JWT_SECRET)

		
		res.cookie("token", token)

		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

router.get("/roles", async (req,res,next)=> {
    const roles = await model.getRoles() 
    res.status(200).json(roles)
})




module.exports = router