import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
// api logic for user to login register book appointment payment 

//api to register user:
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        // Validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Saving user to database
        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();
        // Generating token for user

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ success: true, token })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message });
    }
}


// API for user login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser }