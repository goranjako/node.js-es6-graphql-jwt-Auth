import { FilterRootFields, FilterToSchema } from "apollo-server";

import {user} from '../../config/verify';


export default  {
    Query: {
      todos: (parent, args,{Todo}) => {
        return Todo.find({});
      },
      todoId: (parent,args,{Todo,User}) => {
        return Todo.find({ userId: args.userId});
      } 
    },

    Mutation: {
    
      addTodo: async (paren,{input},{Todo}) => {
        await user.validate(input, {abortEarly: false});
        let todos = new Todo({
            userId:input.userId,
            item:input.item,
            complete:input.complete
            
        });
        return todos.save();
      } 
    }
}
    
