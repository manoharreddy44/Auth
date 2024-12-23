import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';



export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try{
    await newUser.save();
    res.status(201).json({ message: 'User created'});
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({email : email});
    if(!validUser){
      return next(errorHandler(400, 'Invalid email or password'));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if(!validPassword){
      return next(errorHandler(400, 'Invalid email or password'));
    }

    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires : new Date(Date.now() + 3600000)
      })
      .status(200)
      .json(rest);
    


  } catch (error) {
    next(error);
  }
  
};