const jwt = require("jsonwebtoken")
const { userModel } = require("../model/usermodel")
const { blacklistModel } = require("../model/blacklistmodel")


const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(' ')[1]

        //here we can check token is blacklist or not
        // const blacklisttoken = await blacklistModel.findOne({ token: token })

        // if (blacklisttoken) {
        //     res.status(401).json({ err: "token is blacklisted" })
        //     return;
        // }


        if (token) {
            jwt.verify(token, "masai", async (err, decoded) => {
                if (decoded) {
                    const { userID } = decoded

                    const user = await userModel.findOne({ _id: userID })

                    const requiredrole = user.role;


                    req.role = requiredrole

                    next()
                }
            })
        }
        else {
            res.status(401).json({ err: "please login" })
        }
    }
    catch (err) {
        res.status(401).json({ err })
    }
}

module.exports = { auth }