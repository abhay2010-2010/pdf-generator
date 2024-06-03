const access = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.role)) {
            return res.status(403).json({ message: "You are not authorized !" })
        }
        else {
            next()
        }
    }
}

module.exports = { access };