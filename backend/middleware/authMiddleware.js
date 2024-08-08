import jwt from 'jsonwebtoken';

export const Auth = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token);
        const decodedToken = jwt.verify(token, 'abcd');
        req.userData = { userId: decodedToken.userId };
        // const user = await User.findById(req.userData.userId);
        // console.log(user.username);

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Authentication failed, try again' });
    }
};
