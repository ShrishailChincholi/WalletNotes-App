const AddnoteModule = require('../modules/Addnote.module');

// Create notes
const Addnote = async (req, res) => {
    try {
        const { title, sub, content } = req.body;
        const newdata = new AddnoteModule({
            title: title,
            sub: sub,
            content: content
        });
        await newdata.save();
        res.status(201).json({
            success: true,
            message: "Notes Saved Successfully!"
        });
        console.log("Note saved Successfully");
    } catch (error) {
        console.log(`Error in addnotes controller = ${error}`);
    }
}

const getnotes =
    async (req, res) => {
        const notes = await AddnoteModule.find();
        res.json(notes);
    };


// Get a single routes for edite
const getSingleNote = async (req, res) => {
    try {
        const note = await AddnoteModule.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({
            success:true,
            data:note
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


// Update the notes
const updateNotes = async (req,res) => {
    try {
         const id = req.params.id;

    const updatedNote = await AddnoteModule.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, message: "Note Updated!", data: updatedNote });
    } catch (error) {
         res.status(500).json({ success: false, error });
         console.log("Not Updateing Date ")
    }
}

// Delete The notes 
const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    await AddnoteModule.findByIdAndDelete(id);
    res.json({ success: true, message: "Note Deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

module.exports = {
    Addnote,
    getnotes,
    updateNotes,
    deleteNote,
    getSingleNote,
};

