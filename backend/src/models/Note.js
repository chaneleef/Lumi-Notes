import mongoose from "mongoose";

// 1. create a schema 
// 2. create model based off the schema


const noteSchema = new mongoose.Schema(
  {
    // which user owns this note — every query is scoped to this
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title:{
     type: String,
     required: true,
    },
    content: {
     type: String,
     required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);


const Note = mongoose.model("Note", noteSchema)

export default Note

