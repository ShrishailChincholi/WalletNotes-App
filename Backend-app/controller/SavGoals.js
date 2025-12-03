const SavingGoalsModules = require("../modules/SavingGolas");

const SavingGoalsController = async (req,res) => {
    try {
        const{title,targetamout,saveamount} = req.body;
        const newData = new SavingGoalsModules({
            title:title,
            targetamout:targetamout,
            saveamount:saveamount
        })
        await newData.save();
        res.status(201).json({
            success:true,
            message:"SaveGoals Saved Successfully"
        })
        console.log("SaveGoals Saved Successfully");
        

    } catch (error) {
        console.log(`Error in Saving Controller goals ${error}`,error)
    }
}


module.exports =SavingGoalsController

