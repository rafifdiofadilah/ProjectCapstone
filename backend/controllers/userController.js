import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { email, phoneNumber, password, role } = req.body;
         
        console.log(req.body)

        if (!email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User  already exists with this email.',
                success: false,
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log(email,password)

        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        
       
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000 , httpsOnly: true}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, skills, hobbies } = req.body;
        
        const file = req.file;
        // Cloudinary profile picture
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        
        let hobbiesArray;
        if (hobbies) {
            hobbiesArray = hobbies.split(",");
        }
        const userId = req.id; // Middleware authentication
        console.log(userId)
        
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(400).json({
                message: 'User  already exists with this email.',
                success: false,
            })
        }
        
        let user = await User.findById(userId);
        
        if (!user) {
            return res.status(400).json({
                message: "User  not found.",
                success: false
            })
        }
        // Updating data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (skills) user.profile.skills = skillsArray;
        if (hobbies) user.profile.hobbies = hobbiesArray;
      

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role : user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}