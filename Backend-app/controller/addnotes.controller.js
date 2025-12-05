const AddnoteModule = require('../modules/Addnote.module');
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

const updateNotes = async (req,res) => {
    try {
        const id = req.params.id;
        await AddnoteModule.findByIdAndUpdate(id,req.body);
        res.json({ success: true, message: "Note Updated!" })
    } catch (error) {
         res.status(500).json({ success: false, error });
         console.log("Not Updateing Date ")
    }
}

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

};

