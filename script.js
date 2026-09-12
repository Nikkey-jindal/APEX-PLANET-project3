// ==============================
// INTERACTIVE QUIZ
// ==============================

const questions = [
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },

    {
        question: "Which method is used to select an element by ID?",
        options: [
            "getElementById()",
            "getElement()",
            "queryId()",
            "selectId()"
        ],
        answer: "getElementById()"
    },

    {
        question: "Which method converts JSON data into a JavaScript object?",
        options: [
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()",
            "JSON.toObject()"
        ],
        answer: "JSON.parse()"
    },

    {
        question: "Which keyword is used for asynchronous functions?",
        options: [
            "async",
            "await",
            "Both async and await",
            "promise"
        ],
        answer: "Both async and await"
    },

    {
        question: "Which method is used to fetch data from an API?",
        options: [
            "getData()",
            "fetch()",
            "requestData()",
            "api()"
        ],
        answer: "fetch()"
    }
];


let currentQuestion = 0;
let score = 0;


const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const nextButton =
    document.getElementById("nextBtn");

const scoreElement =
    document.getElementById("score");


function showQuestion() {

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    optionsElement.innerHTML = "";

    current.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option");

        button.addEventListener("click", () => {

            checkAnswer(button, option);

        });

        optionsElement.appendChild(button);

    });

}


function checkAnswer(button, selectedAnswer) {

    const correctAnswer =
        questions[currentQuestion].answer;

    const allOptions =
        document.querySelectorAll(".option");


    allOptions.forEach(option => {

        option.disabled = true;

    });


    if (selectedAnswer === correctAnswer) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        allOptions.forEach(option => {

            if (option.textContent === correctAnswer) {
                option.classList.add("correct");
            }

        });

    }

}


nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        questionElement.textContent =
            "🎉 Quiz Completed!";

        optionsElement.innerHTML = "";

        nextButton.style.display = "none";

        scoreElement.textContent =
            `Your Score: ${score} / ${questions.length}`;

    }

});


showQuestion();


// ==============================
// API INTEGRATION
// ==============================

const jokeButton =
    document.getElementById("jokeBtn");

const jokeElement =
    document.getElementById("joke");


jokeButton.addEventListener("click", async () => {

    jokeElement.textContent =
        "Loading joke...";


    try {

        const response =
            await fetch(
                "https://official-joke-api.appspot.com/random_joke"
            );


        const data =
            await response.json();


        jokeElement.textContent =
            `${data.setup} — ${data.punchline}`;

    }

    catch (error) {

        jokeElement.textContent =
            "Unable to fetch joke. Please try again.";

        console.log(error);

    }

});