import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";

export async function register(req, res){
    try{
        const { username, password, first_name, last_name, account_type } = req.body;
        
        if (!username || !password || !first_name || !last_name || !account_type){
            return res.status(400).json({ success: false, message: "All fields are required"});
        }
        
        const existingUser = await User.findOne({ username: username})

        if (existingUser){
            return res.status(400).json({success: false, message: "Username is already exist"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: hashedPassword,
            account_type: account_type
        })

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({success: true,
            user: {
                ...newUser._doc,
                password: ""
            }
        })
    }
    catch(error){
        console.log("Register Controller Error", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function login(req, res){
    try{
        const { username, password } = req.body;

        if (!username || !password){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        
        const userRecord = await User.findOne({ username: username })

        if (!userRecord){
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        const isMatch = await bcryptjs.compare(password, userRecord.password);

        if (!isMatch){
            return res.status(401).json({ success: false, message: "Invalid password"})
        }

        generateTokenAndSetCookie(userRecord._id, res);

        res.status(200).json({ success: true, message: "Login successful" });
    }
    catch(error){
        console.log("Login Controller Error", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function logout(req, res){
    try{
        res.clearCookie("jwt-inventory");
        res.status(200).json({ success: true, message: "Logged out successfully" })
    }
    catch(error){
        console.log("Logout Controller Error "+ error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
