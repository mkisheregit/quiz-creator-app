const Quiz = require('../Models/Quiz');

const getHome = function(req, res) {
    Quiz.find(function(err, foundDB) { //here foundDB is whole database
        if (foundDB.length > 0) {
            res.render("index", { quizzesdb: foundDB }); //pass complete db to index.ejs
        } else {
            res.render("index", { quizzesdb: [] });
        }
    })
}

const postHome = function(req, res) {
    const newquiz = new Quiz({
        title: req.body.title,
        description: req.body.description,
        expDate: req.body.expDate
    });
    quizTitleAsParam = req.body.title; // get title of quiz to redirect to  line 20
    newquiz.save(function(err) {
        if (!err) {
            res.redirect("/quizzes/" + quizTitleAsParam);
        } else {
            res.send(err);
        }
    });
}

const deleteQuiz = function(req, res) {
    const Id = req.body.delete_quiz_button;
    Quiz.deleteOne({ _id: Id }, function(err) {
        if (!err) {
            console.log("removed whole quiz");
        }
    });
    res.redirect("/");
}

module.exports = { getHome, postHome, deleteQuiz };