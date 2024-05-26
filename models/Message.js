import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId, // We are referencing the User model
        ref: "User", 
        required: true,
    },

    recipient: {
        type: Schema.Types.ObjectId, // We are referencing the User model
        ref: "User",
        required: true,
    },
    property: {
        type: Schema.Types.ObjectId, // We are referencing the Property model
        ref: "Property",
        required: true,
    },
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide your email address"],
        trim: true,
    },
    phone: {
        type: String,
       
    },
    body:{
        type: String,
        
    },
    read:{
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true,});

const Message =  models.Message || model("Message", MessageSchema);
export default Message;

