import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

export const Signup = async(req, res) =>{
    try {
        const {email, password, username} = req.body;

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new User({
            email: email,
            password: hashedPassword,
            username: username
        });

        await user.save();
        res.json({
            message: "Registerd successfully!",
            user: user,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal error server"
        });
    }
}

export const Login = async(req, res) =>{
    try {
        const { email, password } = req.body;
 
        // Find the user by email
        const user = await User.findOne({ email });
 
        if (!user) {
            return res.status(401).json({
                error:
                    'Invalid credentials'
            });
        }
 
        // Compare passwords
        const passwordMatch = await bcryptjs.compare(password,
            user.password);
 
        if (!passwordMatch) {
            return res.status(401).json({
                error:
                    'Invalid credentials'
            });
        }
 
        // Generate JWT token
        const token = jwt.sign({ userId: user._id },
            'abcd', {
            expiresIn: '2h',
        });

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000
          });
 
        res.json({ token, 
            success: true,
        message: "Login successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal error server"
        });
    }
}


export const Logout = (req,res) =>{
    res.clearCookie('token').send('Logged out successfully');
}

export const ProtectedRoute = async(req, res) =>{
    const {userId} = req.userData;
    const user = await User.findById(userId);
    res.json({
        message: "Aunthenticated!",
        user
    })
}