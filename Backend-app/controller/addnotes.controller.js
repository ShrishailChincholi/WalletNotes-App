const AddnoteModule = require('../modules/Addnote.module');
const Addnote = async (req,res) => {
    try {
        const {title,sub,content} = req.body;
        const newdata = new AddnoteModule({
            title: title,
            sub: sub,
            content : content
        });
        await newdata.save();
        console.log("Note saved Successfully");
    } catch (error) {
        console.log(`Error in addnotes controller = ${error}`);
    }
}

module.exports = Addnote;