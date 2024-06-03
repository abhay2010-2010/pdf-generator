const jwt = require("jsonwebtoken")
const Users = require("../schema/user.schema")
const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(' ')[1]

        //here we can check token is blacklist or not
        // const blacklisttoken = await blacklistModel.findOne({token:token})

        // if(blacklisttoken){
        //     res.status(401).json({err:"token is blacklisted"})
        //     return;
        // }

        if (token) {

            jwt.verify(token, "masai", async (err, decoded) => {
                if (decoded) {
                    const userID = decoded._id;
                    // console.log(userID);
                    const user = await Users.findOne({ _id: userID })

                    const requiredrole = user.role;
                    console.log(requiredrole);
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