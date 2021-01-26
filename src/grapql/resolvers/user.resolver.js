import { UserInputError } from 'apollo-server-express'
import bcrypt from 'bcrypt-nodejs';
import authHeader from '../../config/auth';
import jwt from 'jsonwebtoken';
import {signUp,signIn} from '../../config/verify.js';
import dotenv from 'dotenv';
dotenv.config();


export default {
    Query: {
      users: (parent, args,{req,User}) => {
        const user = authHeader(req);
        return User.find({});
      },
      userId: (parent, args,{req,User}) => {
        const user = authHeader(req);
        return User.findById(args.id);
      },
      login: async (paren,{input},{User}) => {
        await signIn.validate(input, {abortEarly: false});
        try{
          const user= await User.findOne({email:input.email});
          if(!user){
            throw new UserInputError('User  not found');
          } 
          const isEqual = await bcrypt.compareSync(input.password, user.password);
          if (!isEqual) {
            
            throw new UserInputError('Wrong credentials!');
          }
          const token=jwt.sign({user}, process.env.SECRET_TOKEN, {
            expiresIn: 60 * 60,
          })
          return {token}

        }
        catch (error) {
          throw error;
        }
    } 
    },
    Mutation: {
    
      register: async (paren,{input},{User}) => {
          await signUp.validate(input, {abortEarly: false});
        try{
          const user= await User.findOne({email:input.email});
          if(user){
            throw new UserInputError('User already Exists');
          }
          let newUser = new User({
            fullName:input.fullName,
             email:input.email,
             password:input.password   
          });
          const saveduser= newUser.save();
          const token=jwt.sign({saveduser}, process.env.SECRET_TOKEN, {
            expiresIn: 60 * 60,
          })
          return {token}

        }
        catch (error) {
          throw error;
        }
    
      } 
    }
   




}
   
