import { FilterRootFields, FilterToSchema } from "apollo-server";

import {
  todor

} from '../../config/verify.js';
import todo from "../shemas/todo";

export default  {
    Query: {
      todoss: (parent, args,{Todo}) => {
        return Todo.find({});
      },
      todoId: (parent,args,{Todo,User}) => {
        return Todo.find({ userId: args.userId});

      
      } 
    },
    Mutation: {
    
      addTodo: async (paren,{input},{Todo}) => {
        await todor.validate(input, {abortEarly: false});
        let todoss = new Todo({
            userId:input.userId,
            item:input.item,
            complete:input.complete
            
        });
        
        return todoss.save();
    
      } 
    }
}
      /*
      updateTodo: (parent, args) => {
        if (!args.id) return;
          return Todo.findOneAndUpdate(
           {
             _id: args.id
           },
           {
             $set: {
                fullName: args.fullName,
                email: args.email
             }
           }, {new: true}, (err, Todo) => {
             if (err) {
               console.log('Something went wrong when updating the Todo');
             } else {
             }
           }
        );
      }
    }
  }
  */
