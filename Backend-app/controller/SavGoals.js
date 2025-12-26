const SavingGolas = require("../modules/SavingGolas");
const SavingGoalsModules = require("../modules/SavingGolas");

const SavingGoalsController = async (req, res) => {
    try {
        const { title, targetAmount, savedAmount } = req.body;
        const newData = new SavingGoalsModules({
            title: title,
            targetAmount: targetAmount,
            savedAmount: savedAmount,

            userId: req.userId
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
        // await SavingGoalsModules.findByIdAndUpdate(id, req.body);
        const updategoals = await SavingGoalsModules.findOneUpdate(
            { _id: id, userId: req.userId }, //OwerShip Check
            req.body,
            { new: true }
        )

        if (!updategoals) {
            return res.status(404).json({
                success: false,
                message: "Goal Not found Or Unauthorized "
            })
        }

        res.json({
            success: true,
            message: "Goal Updated Successfully!",
            data: updategoals
        });

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

        const deletedGoal = await SavingGoalsModules.findOneAndDelete({
            _id: id,
            userId: req.userId, //  ownership check
        });

        if (!deletedGoal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found or unauthorized",
            });
        }

        res.json({ success: true, message: "Goal Deleted Successfully!" });
        console.log("Goals Dleted ")
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

