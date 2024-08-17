import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('bearer'))
    {
        const token = req.headers.authorization.split(' ')[1];
        if(token==null) res.sendStatus(401)
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err) res.sendStatus(403)
            req.user = user;
            next();
        });

    }else
    res.sendStatus(401)
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.role === "user"){
            next()
        }else{
           return res.status(401).json({success: false, message: "You are not authenticated"})
        }
    })
}

export const verifyHotel = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.role === "hotel"){
            next()
        }else{
           return res.status(401).json({success: false, message: "You are not autherized"})
        }
    })
}
export const verifyTourGuide = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.role === "tourGuide"){
            next()
        }else{
           return res.status(401).json({success: false, message: "You are not autherized"})
        }
    })
}
export const verifyVehicleDriver = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.role === "vehicleDriver"){
            next()
        }else{
           return res.status(401).json({success: false, message: "You are not autherized"})
        }
    })
}