// <!-- Name: Utsav Bajracharya
// Date: 11/25/2023 -->

// Array to store quiz questions, options and answers
const quizData = [
    {
        question: 'What is the capital of France?',
        a: 'Paris', 
        b: 'London', 
        c: 'Berlin', 
        d: 'Madrid', 
        correct: 'a',
    },
    {
        question: 'What is the largest planet in our solar system?',
        a: 'Mars', 
        b: 'Saturn', 
        c: 'Jupiter', 
        d: 'Neptune', 
        correct: 'c',
    },
    {
        question: 'Which country won the FIFA World Cup in 2014?',
        a: 'Brazil', 
        b: 'Germany', 
        c: 'France', 
        d: 'Argentina', 
        correct: 'b',
    },
    {
        question: 'What is the tallest mountain in the world?',
        a: 'Mount Everest', 
        b: 'K2', 
        c: 'Kangchenjunga', 
        d: 'Makalu', 
        correct: 'a',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        a: 'Uranus', 
        b: 'Venus', 
        c: 'Mercury', 
        d: 'Mars', 
        correct: 'd',
    },
    {
        question: 'Which animal is known as the King of the Jungle?',
        a: 'Tiger', 
        b: 'Lion', 
        c: 'Elephant', 
        d: 'Giraffe', 
        correct: 'b',
    },
    ]

    // Get HTML elements by id   
    const quiz = document.getElementById('quiz');
    const answerEls = document.querySelectorAll('.answer');
    const questionEl = document.getElementById('question');
    const option_a = document.getElementById('option_a');
    const option_b = document.getElementById('option_b');
    const option_c = document.getElementById('option_c');
    const option_d = document.getElementById('option_d');
    const submitBtn = document.getElementById('submit');


    // Variables to track the current quiz question and score
    let currentQuiz = 0;    
    let score = 0;

    // Initial load of the quiz
    loadQuiz()

    // Function to clear selected answers
    function deselectAnswers() {
        answerEls.forEach(answerEl => answerEl.checked = false);
    }
    
    // Function to get the selected answer
    function getSelected() {
        let answer = null; // Initialize answer
        answerEls.forEach(answerEl => {
            if (answerEl.checked) {
                answer = answerEl.id;
            }
        });
        return answer;
    }

    // Function to load a new quiz question
    function loadQuiz() {
        deselectAnswers();

        // Remove highlighting classes from the previous question
        answerEls.forEach(answerEl => {
            answerEl.parentNode.classList.remove('correct', 'incorrect');
        });
    
        const currentQuizData = quizData[currentQuiz];

        // Add the fade-in class to the entire quiz header
        const quizHeader = document.querySelector('.quiz-header');
        quizHeader.classList.add('fade-in');


        questionEl.innerHTML = currentQuizData.question;
        option_a.innerHTML = currentQuizData.a;
        option_b.innerHTML = currentQuizData.b;
        option_c.innerHTML = currentQuizData.c;
        option_d.innerHTML = currentQuizData.d;
    
        // Remove the fade-in class after a short delay
        setTimeout(() => {
            quizHeader.classList.remove('fade-in');
        }, 1000); // Set delay duration to 1000 milliseconds
}   
    
    
    submitBtn.addEventListener('click', () => {
        const answer = getSelected();
        if (answer) {
            const correctAnswerId = quizData[currentQuiz].correct;
            const correctAnswerEl = document.getElementById(correctAnswerId);
    
            // Highlight the correct answer
            correctAnswerEl.parentNode.classList.add('correct');
    
            // Highlight the incorrect answer
            if (answer !== correctAnswerId) {
                document.getElementById(answer).parentNode.classList.add('incorrect');
            }
    
            // Delay for a second before moving to the next question
            setTimeout(() => {
                // Remove highlighting classes from the previous question
                answerEls.forEach(answerEl => {
                    answerEl.parentNode.classList.remove('correct', 'incorrect');
                });
    
                // Update the score and move to the next question
                if (answer === correctAnswerId) {
                    score++;
                }
    
                currentQuiz++;
    
                if (currentQuiz < quizData.length) {
                    loadQuiz();
                } else {
                    // Display the final score
                    quiz.innerHTML = `<h2>You have scored ${score} out of ${quizData.length}</h2>`;
                    const tryAgainBtn = document.createElement('button');
                    tryAgainBtn.textContent = 'Try Again';
                    tryAgainBtn.onclick = () => location.reload();
                    quiz.appendChild(tryAgainBtn);
                }
            }, 1000); // 1000 milliseconds = 1 second
        }
    });
    