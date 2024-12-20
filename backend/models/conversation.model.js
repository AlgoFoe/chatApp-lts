import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
    participants: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    ],
    lastMessage: {
        text:String,
        sender:{type: mongoose.Schema.Types.ObjectId, ref:"User" },
        updatedTime:String,
        seen:{
            type:Boolean,
            default:false,
        }
    },
    messages: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
        },
    ],
    },{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;