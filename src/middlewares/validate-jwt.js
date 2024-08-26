import jwt from 'jsonwebtoken'
import User from '../modules/user/user.model.js'
import Personal from '../modules/personal/personal.model.js'

export const validateJWT = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['token'];

    if (!token) {
        return res.status(401).json({
            msg: "We couldn't find a token in the request.",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // Check if the user exists in the User collection
        let user = await User.findById(uid);
        
        // If not found in User, check in Personal collection
        if (!user) {
            user = await Personal.findById(uid);
            if (!user) {
                return res.status(400).json({
                    msg: 'Invalid token doesnt exist user',
                });
            }
        }

        // Check if the user's status is active
        if (user.status === false) {
            return res.status(400).json({
                msg: 'Invalid token server error',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};