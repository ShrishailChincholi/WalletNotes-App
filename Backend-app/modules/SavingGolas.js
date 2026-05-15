
const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goalName: String,
  targetAmount: Number,
  currentAmount: Number,
 
});

module.exports = mongoose.model('SavingGoal', goalSchema);