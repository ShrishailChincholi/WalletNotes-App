const SavingGoalsModules = require("../modules/SavingGolas");
const SavingGolas = require("../modules/SavingGolas");

// ADD GOAL
const SavingGoalsController = async (req, res) => {

    try {

        const { title, targetAmount, savedAmount } = req.body;

        const newData = new SavingGoalsModules({

            title,
            targetAmount,
            savedAmount,

            userId: req.userId
        });

        await newData.save();

        res.status(201).json({
            success: true,
            message: "Goal Saved Successfully",
            data: newData
        });

        console.log("Goal Saved Successfully");

    } catch (error) {

        console.log(`Error in Saving Goals = ${error}`);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// GET GOALS
const getGoalsController = async (req, res) => {

    try {

        console.log("REQ USER =", req.userId);

        const goals = await SavingGoalsModules.find({
            userId: req.userId
        });

        console.log("FOUND GOALS =", goals);

        res.status(200).json({
            success: true,
            data: goals
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// UPDATE GOAL
const UpdateGoals = async (req, res) => {

    try {

        const id = req.params.id;

        const updategoals = await SavingGoalsModules.findOneAndUpdate(

            { _id: id, userId: req.userId },

            req.body,

            { new: true }

        );

        if (!updategoals) {

            return res.status(404).json({
                success: false,
                message: "Goal Not Found"
            });
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
};


// DELETE GOAL
const DeleteGoals = async (req, res) => {

    try {

        const id = req.params.id;

        const deletedGoal = await SavingGoalsModules.findOneAndDelete({

            _id: id,
            userId: req.userId,
        });

        if (!deletedGoal) {

            return res.status(404).json({
                success: false,
                message: "Goal not found"
            });
        }

        res.json({
            success: true,
            message: "Goal Deleted Successfully!"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error deleting goal",
            error: error.message,
        });
    }
};


module.exports = {
    SavingGoalsController,
    getGoalsController,
    UpdateGoals,
    DeleteGoals,
};