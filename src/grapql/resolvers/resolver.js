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
      /*
      updateUser: (parent, args) => {
        if (!args.id) return;
          return User.findOneAndUpdate(
           {
             _id: args.id
           },
           {
             $set: {
                fullName: args.fullName,
                email: args.email
             }
           }, {new: true}, (err, User) => {
             if (err) {
               console.log('Something went wrong when updating the User');
             } else {
             }
           }
        );
      }
    }
  }
   signUp: async (root, args, { req }, context, info) => {
      await Joi.validate(args, signUp, { abortEarly: false })
      const createdUser = await db.Users.create(args)
      req.session.userId = createdUser.id
      return createdUser

    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        const isValidEmail =  emailExpression.test(String(email).toLowerCase())
        if(!isValidEmail)
        throw new Error("email not in proper format")
  
        if(fullName.length > 15)
        throw new Error("firstName should be less than 15 characters")
  
  */
