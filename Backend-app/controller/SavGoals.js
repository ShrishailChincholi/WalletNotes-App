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

const UpdateGoals = async (req, res) => {
    try {
        const id = req.params.id;
        await SavingGoalsModules.findByIdAndUpdate(id, req.body);

        res.json({ success: true, message: "Goal Updated Successfully!" });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating goal",
            error: error.message,
        });
    }
}

const DeleteGoals = async (req, res) => {
    try {
        const id = req.params.id;

        await SavingModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Goal Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting goal",
            error: error.message,
        });
    }

}

module.exports = {
    SavingGoalsController,
    UpdateGoals,
    DeleteGoals,
};

