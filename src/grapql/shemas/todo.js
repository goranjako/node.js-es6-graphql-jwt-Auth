import {  gql } from 'apollo-server-express';


const todo= gql `
type Todo {
  id:ID!
  userId:String!
  item:String!
  complete:Boolean!
}
 extend type Query {
    todoss:[Todo!]
    todoId(userId:String):[Todos!]!
  
  }
  type Todos {
    userId:String!
    item:String!
    complete:Boolean!
  }
  input todoInput {
  userId:ID!
  item:String!,
  complete:Boolean!
  }
  extend type Mutation { 
    addTodo(input:todoInput!):Todo!
  }
 
`;


export default  todo;



