$(document).ready(function() {
    const quizAppContainer = $('#quiz-app');
    let currentQuizQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Fetch Quiz Data
    async function fetchQuizData(endpoint) {
        try {
            const response = await fetch(`https://my-json-server.typicode.com/william-russo/Project3/${endpoint}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Fetch error: ", error);
            quizAppContainer.html("<p>An error occurred while fetching data. Please try again later.</p>");
        }
    }

    // Load Quiz Questions
    async function loadQuiz(quizId) {
        const quizData = await fetchQuizData(`quizzes/${quizId}`);
        currentQuizQuestions = quizData.questions;
        loadQuestion();
    }

    // Load the current question
    async function loadQuestion() {
        if (currentQuestionIndex < currentQuizQuestions.length) {
            const questionId = currentQuizQuestions[currentQuestionIndex];
            const question = await fetchQuizData(`questions/${questionId}`);
            renderQuestion(question);
        } else {
            renderResults();
        }
    }

    // Render question based on type
    function renderQuestion(question) {
        let source, template;
        switch (question.type) {
            case "multipleChoice":
                source = $('#question-multiple-choice-template').html();
                break;
            case "narrative":
                source = $('#question-narrative-template').html();
                break;
            // Add more cases for other question types
            default:
                console.error("Unsupported question type:", question.type);
                return;
        }
        template = Handlebars.compile(source);
        quizAppContainer.html(template(question));
        handleAnswerSubmission(question);
    }

    // Handle answer submission
    function handleAnswerSubmission(question) {
        $('.answer-btn, #submit-answer').off().on('click', function() {
            let selectedAnswer;
            if (question.type === "narrative") {
                selectedAnswer = $('#narrative-answer').val().trim();
                if (!selectedAnswer) {
                    alert("Please provide an answer.");
                    return;
                }
            } else {
                selectedAnswer = $(this).data('answer');
            }

            if (selectedAnswer === question.answer) {
                score++;
                alert("Correct!");
            } else {
                alert(`Incorrect. The correct answer was ${question.answer}`);
            }
            currentQuestionIndex++;
            loadQuestion();
        });
    }

    // Render Results
    function renderResults() {
        const source = $('#result-template').html();
        const template = Handlebars.compile(source);
        const resultMessage = `Quiz Completed. Your score: ${score}/${currentQuizQuestions.length}`;
        quizAppContainer.html(template({ message: resultMessage }));
        resetQuiz();
    }

    // Reset quiz
    function resetQuiz() {
        $('#restart-quiz').click(function() {
            currentQuestionIndex = 0;
            score = 0;
            renderQuizSelection();
        });
    }

    // Render Quiz Selection (Initial Screen)
    function renderQuizSelection() {
        const source = $('#quiz-selection-template').html();
        const template = Handlebars.compile(source);
        quizAppContainer.html(template({}));

        $('#start-quiz').click(function() {
            const selectedQuizId = $('#quiz-select').val();
            if (!selectedQuizId) {
                alert("Please select a quiz.");
                return;
            }
            loadQuiz(selectedQuizId);
        });
    }

    renderQuizSelection();
});


