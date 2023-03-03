import User from "../model/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {
        const newUser = new User({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        })
        await newUser.save()
        res.status(200).json("register successfully!")
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "user not found!"))

        const isCorrect = bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) return next(createError(400, "wrong credentials!"))

        const access_token = jwt.sign({
            id: user._id
        }, process.env.JWT, { expiresIn: "1d" })
        const { password, ...otherDetails } = user._doc

        res.status(200).json({ ...otherDetails, access_token })

        // const token = jwt.sign({ id: user._id }, process.env.JWT)

        // res.cookie("access_token", token, {
        //     httpOnly: true
        // }).status(200).json(otherDetails)
    } catch (err) {
        next(err)
    }
}

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT)
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user._doc)
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save()
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT)
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc)
        }
    } catch (err) {
        next(err)
    }
}