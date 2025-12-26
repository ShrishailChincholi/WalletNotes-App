const mongoose = require('mongoose');

const AddnoteModule = mongoose.Schema(
    {
        title:{type:String,require:true},
        sub:{type:String,require:true},
        content:{type:String,require:true},
        useerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true,
        }
    }
)

module.exports = mongoose.model('Addnotes',AddnoteModule)