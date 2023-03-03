import express from "express"
import { googleAuth, login, register } from "../controllers/authCont.js"

const route = express.Router()

route.post("/register",register)
route.post("/login",login)
route.post("/google",googleAuth)

export default route