import express from "express"
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../../src/controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router


// app.listen(5001, () => {
//     console.log("Server started on PORT: 5001")
// });