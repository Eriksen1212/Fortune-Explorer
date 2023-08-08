var currentQuestion = 0;
var selectedAnswers = [];
var selectedQuiz = [];

var quizCopy = quiz_list.slice();
for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * quizCopy.length);
    var randomQuestion = quizCopy.splice(randomIndex, 1)[0];
    selectedQuiz.push(randomQuestion);
}

function generateExpression(choices) {
    const operators = ['+', '-', '*'];
    let expression = '';

    for (let i = 0; i < choices.length; i++) {
        let nextIsOperator = Math.random() < 0.5;
        if (i !== 0 && (nextIsOperator || i === choices.length - 1)) {
            expression += operators[Math.floor(Math.random() * operators.length)];
        }
        expression += choices[i];
    }

    return expression;
}

function getFortune() {
    let expression = generateExpression(selectedAnswers);
    let result = eval(expression) % 100;

    if (result < 0) {
        result *= -1;
    }

    while (result < 0 || result >= fortune_list.length) {
        expression = generateExpression(selectedAnswers);
        result = eval(expression) % 100;
        if (result < 0) {
            result *= -1;
        }
    }
    
    return fortune_list[result];
}

function showQuestion() {
    if (currentQuestion === selectedQuiz.length) {
        const fortune = getFortune();
        document.getElementById('question').innerText = '당신의 운세는...';
        document.getElementById('result').innerText = fortune;
        document.getElementById('choices').innerHTML = '';
        return;
    }

    document.getElementById('question').innerText = selectedQuiz[currentQuestion].question;
    document.getElementById('choices').innerHTML = '';
    for (let i = 0; i < 4; i++) {
        let choiceBox = document.createElement('div');
        choiceBox.className = 'choice-box';
        choiceBox.innerText = selectedQuiz[currentQuestion].choices[i];
        choiceBox.addEventListener('click', function() {
            selectedAnswers.push(i + 1);
            currentQuestion++;
            showQuestion();
        });
        document.getElementById('choices').appendChild(choiceBox);
    }
}

showQuestion();
