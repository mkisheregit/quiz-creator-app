const Quiz = require('../Models/Quiz');
const Response = require('../Models/Response');
const _ = require('lodash');

const getScore = async function(req, res) {
    var score = 0;
    var ActualAnswers = [];
    var UserAnswers = [];
    var quizTitle;
    submitQuizId = req.params.submitQuizId;

    await Response.find(function(err, foundResponses) {
        if (foundResponses.length > 0) {
            UserAnswers = foundResponses[0].responses;
        }

    });
    await Quiz.findOne({ _id: submitQuizId }, function(err, foundquizDB) {
        if (!err) {
            if (foundquizDB) {
                console.log(foundquizDB);
                foundquizDB.QandA.forEach((q, i) => {
                    ActualAnswers.push(q.ans);
                });
                quizTitle = foundquizDB.title;

            }
        }
        console.log(ActualAnswers);
    });

    if (UserAnswers.length > 0) {
        for (i = 0; i < ActualAnswers.length; i++) {
            if (_.lowerCase(ActualAnswers[i]) == _.lowerCase(UserAnswers[i])) {
                score += 1;

            }
        }

        res.render('score', { quizTitle: quizTitle, score: Math.round(score), total: ActualAnswers.length });
    } else {
        res.render("<h2 style='text-align:center'>you haven't answered of any quiz yet</h2>");
    }
}

module.exports = getScore;