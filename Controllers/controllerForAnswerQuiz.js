const Quiz = require('../Models/Quiz');
const Response = require('../Models/Response');

const getQuizzes = function(req, res) {

    //every time delete previous responses when page refreshes
    Response.deleteMany(function(err) {
        if (!err)
            console.log("successfully deleted all resposnes");
    });

    let today_time = new Date();
    Quiz.find({}, function(err, foundDB) {
        if (!err) {
            res.render("completeQuiz", { quizzesDB: foundDB, today_time: today_time });
        }
    });
};

const postQuizzesAnswers = async function(req, res) {
    //convert req.body to array
    let arrayOfResponses = Object.entries(req.body); // little tricky
    //save only answers not key

    submitQuizId = req.body.submit_button; // get _id of quiz which has been submitted
    let arrayOfAnswersOnly = [];
    for (i = 0; i < arrayOfResponses.length - 1; i++) { //-1,becasue last element is _id of quiz so remove it
        arrayOfAnswersOnly.push(arrayOfResponses[i][1]);
    }

    const userResponses = new Response({
        responses: arrayOfAnswersOnly
    });

    userResponses.save();
    console.log(arrayOfAnswersOnly);
    res.redirect("/score/" + submitQuizId);
};

module.exports = { getQuizzes, postQuizzesAnswers };