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
    
    return result;  // index 값 반환 (본문에서는 텍스트를 반환했었음)
}

function showQuestion() {
    if (currentQuestion === selectedQuiz.length) {
        const fortuneIndex = getFortune();
        
        // result.html 페이지로 이동하면서, query parameter로 운세 index 값을 넘김
        window.location.href = `result.html?fortune=${fortuneIndex}`;
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
