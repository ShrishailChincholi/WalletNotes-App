const SavingGoalsModules = require("../modules/SavingGolas");

const SavingGoalsController = async (req, res) => {
    try {
        const { title, targetAmount, savedAmount } = req.body;
        const newData = new SavingGoalsModules({
            title: title,
            targetAmount: targetAmount,
            savedAmount: savedAmount
        })
        await newData.save();
        res.status(201).json({
            success: true,
            message: "SaveGoals Saved Successfully"
        })
        console.log("SaveGoals Saved Successfully");


    } catch (error) {
        console.log(`Error in Saving Controller goals ${error}`, error)
    }
}


module.exports = SavingGoalsController

