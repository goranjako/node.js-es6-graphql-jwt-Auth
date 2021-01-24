import mongoose from 'mongoose';
const user = require('./user');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  item: {
    type: String,
    required: true,
    unique: true
  },
  complete:{
    type: Boolean, default: false  
  }

});

module.exports = mongoose.model('Todo', TodoSchema);
