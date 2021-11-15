const Quiz = require('../Models/Quiz');

const getQuiz = function(req, res) {
    const getquizTitle = req.params.quizTitleAsParam;
    //  console.log(getquizTitle);
    Quiz.findOne({ title: getquizTitle }, function(err, foundquizDB) {
        if (!err) {
            if (foundquizDB) {
                console.log(foundquizDB);
                res.render("addQandA", { quizdb: foundquizDB }); //pass data of created quiz(single)
            } else {
                res.send("quiz has not been created");
            }
        } else {
            console.log(err);
        }
    })
}

const postQuiz = function(req, res) {
    const selectedFormId = req.body.button;
    const quizTitle = req.params.quizTitleAsParam;
    const ans = Object.entries(req.body.ans); //because we are getting extra space as element in our ans so
    console.log(ans);
    let getQandA;
    if (req.body.quesType == "MCQ") {
        getQandA = {
            ques: req.body.ques,
            ans: ans[0][1],
            quesType: req.body.quesType,
            optionA: req.body.optionA,
            optionB: req.body.optionB,
            optionC: req.body.optionC,
            optionD: req.body.optionD
        };
    } else {
        getQandA = {
            ques: req.body.ques,
            ans: req.body.ans,
            quesType: req.body.quesType
        };
    }
    Quiz.updateOne({ _id: selectedFormId }, { $push: { QandA: getQandA } }, function(err) {
        if (!err) {
            res.redirect("/quizzes/" + quizTitle);
        } else {
            res.send(err);
        }
    });
}
const deleteItemFromQuiz = async function(req, res) {
    const itemId = req.body.delete_button;
    const quizId = req.body.quiz_id;
    await Quiz.findOne({ _id: quizId }, function(err, foundquizDB) {
        if (foundquizDB) {
            quizTitleAsParam = foundquizDB.title;
            console.log(quizTitleAsParam);
        }
    });
    await Quiz.updateOne({ _id: quizId }, {
        $pull: {
            QandA: { _id: itemId }
        }
    }, function(err, doc) {
        if (!err) {
            console.log("successfully delete one item");
            console.log(doc);
        }
    });
    res.redirect("/quizzes/" + quizTitleAsParam);
}

module.exports = { getQuiz, postQuiz, deleteItemFromQuiz };