const AddnoteModule = require('../modules/Addnote.module');

// Create notes
const Addnote = async (req, res) => {
    try {
        const { title, sub, content } = req.body;

        // Validation
        if (!title || !sub || !content) {
            return res.status(401).json({
                success: false,
                message: "All Fields are required"
            });
        }

        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const newdata = new AddnoteModule({
            title: title,
            sub: sub,
            content: content,

            //geying Id JWT
            userId: req.userId,
        });

        //Save The Data
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
        // const note = await AddnoteModule.findById(req.params.id);

        const note = await AddnoteModule.findOne({
            _id: req.params.id,
            userId: req.userId
        });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({
            success: true,
            data: note
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


// Update the notes
const updateNotes = async (req, res) => {
    try {
        const id = req.params.id;


        // Find By by Id
        // const updatedNote = await AddnoteModule.findByIdAndUpdate(
        //     id,
        //     req.body,
        //     { new: true, runValidators: true }
        // );

        const updatedNote = await AddnoteModule.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true, runValidators: true }
        );



        // If note is not updated
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
        const deleted = await AddnoteModule.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!deleted) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ success: true, message: "Note deleted" });
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

