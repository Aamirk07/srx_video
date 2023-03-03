import express from "express"
import { addVideo, addView, deleteVideo, getVideo, randomVideo, subVideo, trendVideo, updateVideo, searchVideo, getTag, } from "../controllers/videoCont.js"
import { verifyToken } from "../utils/verifyToken.js"

const route = express.Router()

route.post("/",verifyToken, addVideo)
route.put("/:id", verifyToken, updateVideo)
route.delete("/:id", verifyToken, deleteVideo)
route.get("/find/:id", getVideo)
route.put("/view/:id", addView)
route.get("/trend", trendVideo)
route.get("/random", randomVideo)
route.get("/tags", getTag)
route.get("/search", searchVideo)
route.get("/sub", verifyToken, subVideo)

export default route