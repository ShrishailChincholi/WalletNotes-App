const BuddgetModule = require("../modules/BuddgetModule");

const SpendBugetController = async (req, res) => {

    try {

        const { category, amount } = req.body;

        // CHECK OLD BUDGET
        const existingBudget = await BuddgetModule.findOne({
            userId: req.userId
        });

        // ================= UPDATE =================
        if (existingBudget) {

            existingBudget.category = category;
            existingBudget.amount = amount;

            await existingBudget.save();

            return res.status(200).json({
                success: true,
                message: "Budget Updated Successfully",
                budget: existingBudget.amount,
            });
        }

        // ================= CREATE NEW =================
        const newBudget = new BuddgetModule({
            category,
            amount,
            userId: req.userId,
        });

        await newBudget.save();

        res.status(201).json({
            success: true,
            message: "Budget Saved Successfully",
            budget: newBudget.amount,
        });

    } catch (error) {

        console.log("Error in Saving Total Budget", error);

        res.status(500).json({
            success: false,
            message: "Budget Save Failed",
        });
    }
};

module.exports = SpendBugetController;