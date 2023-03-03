import Video from "../model/Video.js"
import User from "../model/User.js"
import { createError } from "../utils/error.js"

export const addVideo = async (req, res, next) => {
    try {
        const newVideo = new Video(req.body)
        const saveVideo = await newVideo.save()
        res.status(200).json(saveVideo)
    } catch (err) {
        next(err)
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found!"))
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403, "you can update only yor video!"))
        }
    } catch (err) {
        next(err)
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found!"))
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted!")
        } else {
            return next(createError(403, "you can delete only yor video!"))
        }
    } catch (err) {
        next(err)
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}

export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("watched!")
    } catch (err) {
        next(err)
    }
}

export const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const trendVideo = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const subVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribeChannels = user.subscribedUsers

        const list = await Promise.all(
            subscribeChannels.map(channelId => {
                return Video.find({ userId: channelId })
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (err) {
        next(err)
    }
}

export const getTag = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const searchVideo = async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}