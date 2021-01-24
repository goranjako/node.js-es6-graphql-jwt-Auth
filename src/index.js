import express from'express';
import cors from'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import User from './models/user';
import Todo from './models/todo';
import morgan from 'morgan';
import  typeDefs  from './grapql/shemas';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  resolvers  from './grapql/resolvers';
dotenv.config();
const app = express();
//mongoose setup
let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
}
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongodbURI)
  .then(db => {
    console.log('Connected to MongoDB');
  });
  app.use(bodyParser.json());

// enable cors
app.use(cors(corsOption));
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['token']
  };
 
  app.use(morgan('dev'));
// Construct a schema, using GraphQL schema language

const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};

 
const server = new ApolloServer({
typeDefs,
resolvers,
  context: req  => ({ req, User,Todo})
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
