const mongoose = require('mongoose');

// Question and Answer Schema 
const QandASchema = mongoose.Schema({
    ques: String,
    ans: String,
    quesType: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String
});

// ** Quiz schema that will be stored in Quizs db
const quizSchema = mongoose.Schema({
    title: String,
    description: String,
    expDate: Date,
    QandA: [QandASchema]
});


const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;