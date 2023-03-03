import { createError } from "../utils/error.js"
import User from "../model/User.js"
import Video from "../model/Video.js"

export const updateUser = async (req, res, next) => {
    console.log(req.user.id)
    if (req.params.id === req.user.id) {
        try {
            const updatedUsr = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUsr)
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You can update only your Account!"))
    }

}

//Delete
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted successfully!")
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You can delete only your Account!"))
    }
}

//GetUser
export const getUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id)
        const { password, ...other } = getUser._doc
        res.status(200).json(other)
    } catch (err) {
        next(err)
    }
}

//Subscribe
export const subscribe = async (req, res, next) => {
    const userId = req.body.id
    try {
        await User.findByIdAndUpdate(userId, {
            $push: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).json("subscribed!")
    } catch (err) {
        next(err)
    }
}

//Unsubscribe
export const unSubscribe = async (req, res, next) => {
    const userId = req.body.id
    try {
        await User.findByIdAndUpdate(userId, {
            $pull: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })
        res.status(200).json("Unsubscribed!")
    } catch (err) {
        next(err)
    }
}

//Like
export const like = async (req, res, next) => {
    const videoId = req.params.videoId
    const userId = req.body.userId
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: userId },
            $pull: { disLikes: userId }
        })
        res.status(200).json("liked")
    } catch (err) {
        next(err)
    }
}

//disLike
export const disLike = async (req, res, next) => {
    const videoId = req.params.videoId
    const userId = req.body.userId
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { disLikes: userId },
            $pull: { likes: userId }
        })
        res.status(200).json("disliked")
    } catch (err) {
        next(err)
    }
}