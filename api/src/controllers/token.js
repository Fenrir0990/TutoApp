require('dotenv').config();
const {SECRET} = process.env
const jwt = require ("jsonwebtoken")

 const validateToken = (req, res,next) => {
    const accesToken = req.headers['authorization']
    if(!accesToken) res.send("Access denied").status(404) //verificar codigo correspondiente
        jwt.verify(accesToken,SECRET, (err, user)=>{
        if(err){
            res.send("Access denied, token incorrect or expired")
        }else{
            next()
        }
    });
};
 const generateToken = (req,res) => {
    res.json({msg:jwt.sign( {tuto:"tutoApp",} , SECRET , {expiresIn : "5m"})}).status(200)
};

module.exports = {
    validateToken,
    generateToken
}

