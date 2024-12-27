const questions = [
    {
        question: "Какую роль выполняет Антимаг в команде?",
        answers: ["Carry", "Support", "Offlane"],
        correct: 0
    },
    {
        question: "Что находится в логове Рошана?",
        answers: ["Aegis of the Immortal", "Сапог скорости", "Молния"],
        correct: 0
    },
    {
        question: "Сколько героев доступно в Dota 2?",
        type: "input",
        correct: "124" // Актуальное число героев может изменяться, проверьте перед использованием
    },
    {
        question: "Какую способность дает Блинг Даггер?",
        type: "input",
        correct: "Телепортация"
    },
    {
        question: "Как называется ключевое строение, уничтожение которого приносит победу?",
        answers: ["Трон", "Бараки"],
        correct: 0
    },
    {
        question: "Кто является создателем героев, известным как 'Invoker' и 'Rubick'?",
        type: "input",
        correct: "Аграх" // Имя условное, уточните лор, если нужно
    }
];


const testForm = document.getElementById('testForm');
const checkAnswersButton = document.getElementById('checkAnswers');
const restartTestButton = document.getElementById('restartTest');

function generateQuestions() {
    testForm.innerHTML = '';
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        if (q.type === 'input') {
            questionDiv.innerHTML += `<input type="text" id="answer${index}">`;
        } else {
            q.answers.forEach((answer, i) => {
                questionDiv.innerHTML += `<label><input type="radio" name="q${index}" value="${i}"> ${answer}</label>`;
            });
        }
        testForm.appendChild(questionDiv);
    });
}

generateQuestions();

checkAnswersButton.addEventListener('click', () => {
    let score = 0;
    questions.forEach((q, index) => {
        let userAnswer;
        if (q.type === 'input') {
            userAnswer = document.getElementById(`answer${index}`).value.trim();
        } else {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            userAnswer = selected ? selected.value : null;
        }

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        if (userAnswer === q.correct.toString() || userAnswer === q.correct) {
            resultDiv.textContent = "Правильно!";
            resultDiv.style.color = "green";
            score++;
        } else {
            resultDiv.textContent = `Неправильно. Правильный ответ: ${q.type === 'input' ? q.correct : q.answers[q.correct]}`;
            resultDiv.style.color = "red";
        }

        testForm.children[index].appendChild(resultDiv);
    });

    document.getElementById('result').textContent = `Ваш результат: ${score} из ${questions.length}`;

    localStorage.setItem('testScore', score);

    checkAnswersButton.disabled = true;
    checkAnswersButton.style.backgroundColor = "#777";
    checkAnswersButton.style.cursor = "not-allowed";

    restartTestButton.style.display = 'block';
});

restartTestButton.addEventListener('click', () => {
    generateQuestions();
    document.getElementById('result').textContent = '';
    restartTestButton.style.display = 'none';

    checkAnswersButton.disabled = false;
    checkAnswersButton.style.backgroundColor = "#333";
    checkAnswersButton.style.cursor = "pointer";
});