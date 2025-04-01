
document.getElementById('start-btn').addEventListener('click', function () {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('subject-screen').classList.remove('hidden');
});

document.getElementById('back-btn').addEventListener('click', function () {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('subject-screen').classList.remove('hidden');
});

const questions = {
    "Science": [
        { question: "Quelle est la formule chimique de l'eau ?", answers: ["O2", "CO2", "H2O", "NaCl"], correct: "H2O" },
        { question: "Quel est l'élément chimique le plus abondant dans l'univers ?", answers: ["Hydrogène", "Oxygène", "Carbone", "Hélium"], correct: "Hydrogène" }
    ]
};

document.querySelectorAll('.subject-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.getElementById('subject-screen').classList.add('hidden');
        document.getElementById('quiz').classList.remove('hidden');
        startQuiz(this.textContent);
    });
});

function startQuiz(subject) {
    let index = 0;
    let timerInterval;
    
    function startTimer(callback) {
        let timeLeft = 10;
        const timerDiv = document.getElementById('timer');
        timerDiv.textContent = timeLeft;
        timerDiv.classList = "w-12 h-12 flex items-center justify-center text-white font-bold text-xl bg-green-500 rounded-full";
        
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDiv.textContent = timeLeft;
            if (timeLeft === 5) timerDiv.classList.replace("bg-green-500", "bg-red-500");
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                callback();
            }
        }, 1000);
    }
    
    function showNextQuestion() {
        if (index >= questions[subject].length) {
            alert('Quiz terminé!');
            location.reload();
            return;
        }
        const q = questions[subject][index];
        document.getElementById('question-text').textContent = q.question;
        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';
        const feedbackDiv = document.getElementById('feedback');
        feedbackDiv.textContent = '';
        
        q.answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.textContent = ans;
            btn.classList = "bg-purple-500 text-white p-2 rounded";
            btn.addEventListener('click', () => {
                feedbackDiv.textContent = ans === q.correct ? "Bonne réponse!" : "Mauvaise réponse!";
                feedbackDiv.classList = ans === q.correct ? "bg-green-500 text-white p-2 rounded" : "bg-red-500 text-white p-2 rounded";
                index++;
                setTimeout(showNextQuestion, 1000);
            });
            answersDiv.appendChild(btn);
        });
        
        startTimer(() => {
            index++;
            showNextQuestion();
        });
    }
    showNextQuestion();
}