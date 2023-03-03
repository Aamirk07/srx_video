import Comments from "../model/Comments.js"
import Video from "../model/Video.js"
import { createError } from "../utils/error.js"

export const addComment = async (req, res, next) => {
    const newComment = new Comments({ ...req.body, userId: req.body.userId })
    try {
        await newComment.save()
        res.status(200).json("done!")
    } catch (err) {
        next(err)
    }
}

export const deleteCom = async (req, res, next) => {
    try {
        const comment = await Comments.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        if (comment.userId === req.user.id || video.userId === req.user.id) {
            await Comments.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted!")
        } else {
            return next(createError(403, "you only able to delete your Comments!"))
        }
    } catch (err) {
        next(err)
    }
}

export const getComents = async (req, res, next) => {
    try {
        const comments = await Comments.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}