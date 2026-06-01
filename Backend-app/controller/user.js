const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../modules/resgitermodule");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
    console.log("user was created")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

const updataeuser = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, password } = req.body;

    const updateDate = {};
    if (name) updateDate.name = name;
    if (email) updateDate.email = email;

    if (password && password.trim() !== "") {
      updateDate.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateDate,
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error," ---  Error edite user profile --");
    res.status(500).json({ message: "Server error" });

  }
}


//  Image upload 
const uploadProfileImage = async (req, res) => {
  try {

    console.log("FILE =", req.file);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        profileImage: `/uploads/${req.file.filename}`
      },
      {
        returnDocument: "after"
      }
    );

    console.log("UPDATED USER =", updatedUser);

    res.json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false
    });
  }
};

//  Get Imgage from DB
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.userId)
            .select("-password");

        res.json({
            success: true,
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false
        });

    }
};

module.exports = {
  registerUser,
  login,
  updataeuser,
  uploadProfileImage,
  getProfile
};