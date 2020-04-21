const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/dv3100rvl/image/upload/v1586640999/DbnZU80_sczoad.jpg"
    },
    followers:[{type:ObjectId, ref:"users"}],
    following:[{type:ObjectId, ref:"users"}],
    created_at: {
        type: Date,
        default: Date.now
    }
})

mongoose.model("users", userSchema);