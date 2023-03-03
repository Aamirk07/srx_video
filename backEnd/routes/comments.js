import express from "express"
import { addComment, deleteCom, getComents } from "../controllers/commentsCont.js"
import { verifyToken } from "../utils/verifyToken.js"

const route = express.Router()

route.post("/", addComment)
route.delete("/:id", verifyToken, deleteCom)
route.get("/:videoId", getComents)

export default route