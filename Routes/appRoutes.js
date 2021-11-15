const express = require('express');

const { postHome, getHome, deleteQuiz } = require('../Controllers/controllerForHome');
const { getQuiz, postQuiz, deleteItemFromQuiz } = require('../Controllers/controllerForAddQandA');
const { getQuizzes, postQuizzesAnswers } = require('../Controllers/controllerForAnswerQuiz');
const getScore = require('../Controllers/controllerForScore');

const router = express.Router();

//Home Page to create Quizzes
router.get("/", getHome);

// post/create Quizzes
router.post("/", postHome);

//   delete whole quiz 
router.post("/delete-quiz", deleteQuiz);

//  Get created quiz to add question and answers
router.get("/quizzes/:quizTitleAsParam", getQuiz);

//post questions and answers to  quiz
router.post("/quizzes/:quizTitleAsParam", postQuiz);

//         delete questions and answers from quiz
router.post("/delete-item", deleteItemFromQuiz);

//   show all quizzes/quizzes to user so that he can pick and answer 
router.get("/answer-quiz", getQuizzes);

// take user answers/inputs from one quiz at a time and add it into Response database
router.post("/answer-quiz", postQuizzesAnswers);

//           show corresponding quiz's score
router.get("/score/:submitQuizId", getScore);

module.exports = router;