const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let pollsSchema = new Schema({

    question: {  type: String,  unique: true,  required: [true, 'question is required'], },
    date: { type: Date, default: Date.now }, 
    
    option1: {  type: String, required: [true, 'Option 1 is required'],}, 
    option1votes: { type: Number,default: 0 },
    
    option2: {  type: String, required: [true, 'Option 2 is required'],}, 
    option2votes: { type: Number,default: 0 },

    option3: {  type: String , default: null }, 
    option3votes: { type: Number,default: 0 },

    option4: {  type: String , default: null }, 
    option4votes: { type: Number,default: 0 },

    total: { type: Number,default: 0 },

});


pollsSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });

module.exports = mongoose.model('Polls', pollsSchema);