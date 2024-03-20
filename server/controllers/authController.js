const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUser = async (req, res) => {
  const { name, phoneNumber, password } = req.body;
  console.log(req.body);

  try {
    
    let user = await User.findOne({ phoneNumber });

    if (!user) {
    
      const hashedPassword = await bcrypt.hash(password, 10); 

      user = new User({
        name,
        phoneNumber,
        password: hashedPassword,
      });

      await user.save();
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    const expirationTime = new Date().getTime() + 60 * 60 * 1000;
  
    const responsePayload = {
      token: token,
      expirationTime: expirationTime,
    };

    res.status(200).json({ responsePayload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { loginUser };
