import express from "express"
import { updateUser, getUser, unSubscribe, subscribe, like, disLike, deleteUser } from "../controllers/userCont.js"
import { verifyToken } from "../utils/verifyToken.js"

const route = express.Router()

//Update user
route.put("/:id", verifyToken, updateUser)
//Delete user
route.delete("/:id", verifyToken, deleteUser)
//Get a user
route.get("/find/:id", getUser)
//Subscribe
route.put("/sub/:id", subscribe)
//Unsubscribe
route.put("/unsub/:id", unSubscribe)
//Like
route.put("/like/:videoId", like)
//Dislike
route.put("/dislike/:videoId", disLike)

export default route