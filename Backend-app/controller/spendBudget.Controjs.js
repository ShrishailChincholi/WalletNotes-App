const BuddgetModule = require("../modules/BuddgetModule");

const SpendBugetController = async (req, res) => {
    try {
        const { budget } = req.body;
        const Data = new BuddgetModule({
            budget: budget,
            userId: req.userId
        })

        await Data.save();

        res.status(201).json({
            success: true,
            message: "Total Budget Saved Successfully"
        })
        console.log("Total Budget Saved Successfully");
    } catch (error) {
        console.log(`Error in Saving Total Budget${error}`, error)
    }
}



module.exports = SpendBugetController;