import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribedUsers: {
        type: [String],
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

export default mongoose.model("User", UserSchema)