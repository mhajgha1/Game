let vector1, vector2, correctAnswer;
let score = 0;
let timeLeft = 60;
let timerInterval;

function generateVector() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function displayVectors() {
    document.getElementById('vectors').innerHTML = `
        <p>v1 = (${vector1.join(', ')})</p>
        <p>v2 = (${vector2.join(', ')})</p>
    `;
}

function createAnswerInputs() {
    document.getElementById('answer-inputs').innerHTML = `
        <p>v1 + v2 = (
            <input type="number" id="answer-0">,
            <input type="number" id="answer-1">,
            <input type="number" id="answer-2">
        )</p>
    `;
}

function newVectors() {
    vector1 = generateVector();
    vector2 = generateVector();
    correctAnswer = vector1.map((v, i) => v + vector2[i]);

    displayVectors();
    createAnswerInputs();
    document.getElementById('result').textContent = '';
    document.getElementById('check-button').style.display = 'inline-block';
    document.getElementById('new-vectors-button').style.display = 'none';
}

function checkAnswer() {
    let isCorrect = true;
    for (let i = 0; i < 3; i++) {
        let userAnswer = parseInt(document.getElementById(`answer-${i}`).value);
        if (userAnswer !== correctAnswer[i]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        document.getElementById('result').textContent = 'Correct! Well done!';
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('check-button').style.display = 'none';
        document.getElementById('new-vectors-button').style.display = 'inline-block';
    } else {
        document.getElementById('result').textContent = 'Incorrect. Try again!';
    }
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    document.getElementById('game-container').innerHTML = `
        <h2>Game Over!</h2>
        <p>Your final score is: ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `;
}

function startGame() {
    newVectors();
    timerInterval = setInterval(updateTimer, 1000);
}

// Start the game when the page loads
window.onload = startGame;