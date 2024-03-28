document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://my-json-server.typicode.com/william-russo/Project3/quizzes';
    let currentQuiz = 0;
    let score = 0;

    async function fetchQuiz() {
        const response = await fetch(`${apiUrl}/1`); // Fetching quiz with ID 1 for simplicity
        const quiz = await response.json();
        displayQuiz(quiz);
    }

    function displayQuiz(quiz) {
        const app = document.getElementById('app');
        app.innerHTML = `<h2>${quiz.title}</h2>`;
        // Handlebars templates would go here
        // This example uses innerHTML directly for simplicity
        quiz.questions.forEach(question => {
            app.innerHTML += `<div class="question-card">
                <p>${question.question}</p>
                ${question.options.map(option => `<button class="btn btn-primary option-button">${option}</button>`).join('')}
            </div>`;
        });

        // Event listener for options
        document.querySelectorAll('.option-button').forEach(button => {
            button.addEventListener('click', function () {
                const parent = this.parentElement;
                const selectedAnswer = this.textContent;
                const questionId = quiz.questions.find(q => q.question === parent.querySelector('p').textContent).id;
                checkAnswer(questionId, selectedAnswer, quiz);
            });
        });
    }

    function checkAnswer(questionId, selectedAnswer, quiz) {
        const question = quiz.questions.find(q => q.id === questionId);
        if (selectedAnswer === question.answer) {
            alert('Correct!');
            score++;
        } else {
            alert(`Wrong! Correct answer: ${question.answer}`);
        }
        // Move to next question or finish quiz
    }

    fetchQuiz();
});
