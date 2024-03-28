// Compile the template
const homeTemplate = Handlebars.compile(document.getElementById("home-template").innerHTML);

// Render the home screen
document.getElementById("app").innerHTML = homeTemplate();

// Event listener for starting the quiz
document.getElementById("startQuiz").addEventListener("click", function() {
    const userName = document.getElementById("name").value;
    startQuiz(userName);
});

// Function to start the quiz
function startQuiz(userName) {
    // Load the first question
    // Replace this with actual logic to load quiz questions from the API
    console.log(`Starting quiz for ${userName}`);
}

// Function to load a question
async function loadQuestion(questionId) {
    const response = await fetch(`https://my-json-server.typicode.com/YOUR_GITHUB_USERNAME/YOUR_REPO/questions/${questionId}`);
    const question = await response.json();
    // Render the question
}

// Add more functions here to handle question rendering, answer submission, and feedback
