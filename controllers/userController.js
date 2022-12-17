
import User from '../models/user.js'
import jwt from "jsonwebtoken";




const getToken = async(req , res) => {


try {

  const newUser = await new User({
    email: req.body.email,
    password: req.body.password
  })

  const user = await newUser.save();

  jwt.sign({user : newUser} , 'secretKey' , (err , token) => {
    res.status(200).json(token);

  })

} catch (e) {
console.log(e);

}



}

export {getToken}
