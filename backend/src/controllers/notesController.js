import Note from "../models/Note.js"

// All handlers below run behind protectRoute, so req.userId is always set.
// Every query is scoped to the owner, and anything not owned by the current
// user returns 404 — so the API never reveals that another user's note exists.

export async function getAllNotes (req,res) {
    try {
        const notes = await Note.find({ owner: req.userId }).sort({createdAt:-1}); // -1 will sort in desc. order -> newest first
        res.status(200).json(notes);

    }
    catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal server error."});
    }

};
export async function getNoteById (req,res) {
    try {
        const note = await Note.findOne({ _id: req.params.id, owner: req.userId });
        if (!note) return res.status(404).json({message:"Note not found"})
        res.status(200).json(note);

    }
    catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message:"Internal server error."});
    }

};

export async function createNote (req,res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content, owner: req.userId });

        const savedNote = await  note.save();
        res.status(201).json(savedNote);
    }
    catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal server error."});
    }
};

export async function updateNote (req,res) {
    try {
        const { title,content }  =req.body;
        const updatedNote = await Note.findOneAndUpdate(
          { _id: req.params.id, owner: req.userId },
          { title, content },
          { new: true }
        );
        if (!updatedNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json(updatedNote);
        }
    catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message:"Internal server error."});
    }
};

export async function deleteNote (req,res) {
     try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!deletedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message: "This note has been deleted."});
        }
    catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal server error."});
    }
};
