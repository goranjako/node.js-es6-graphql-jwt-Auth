import { FilterRootFields, FilterToSchema } from "apollo-server";

import {todo} from '../../config/verify.js';
import todo from "../shemas/todo";

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
        await todo.validate(input, {abortEarly: false});
        let todos = new Todo({
            userId:input.userId,
            item:input.item,
            complete:input.complete
            
        });
        return todos.save();
      } 
    }
}
    
