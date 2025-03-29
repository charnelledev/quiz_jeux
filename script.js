document.getElementById('start-btn').addEventListener('click', function () {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('subject-screen').classList.remove('hidden');
});

document.getElementById('back-btn').addEventListener('click', function () {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('subject-screen').classList.remove('hidden');
});

const scienceQuestions = [
    { question: "Quelle est la formule chimique de l'eau ?", answers: ["O2", "CO2", "H2O", "NaCl"], correct: "H2O" },
    { question: "Quel est l'élément chimique le plus abondant dans l'univers ?", answers: ["Hydrogène", "Oxygène", "Carbone", "Hélium"], correct: "Hydrogène" },
    { question: "Combien de planètes composent le système solaire ?", answers: ["7", "8", "9", "10"], correct: "8" },
    { question: "Quel organe humain consomme le plus d'oxygène ?", answers: ["Le cœur", "Les poumons", "Le cerveau", "Le foie"], correct: "Le cerveau" },
    { question: "Quelle est la vitesse de la lumière ?", answers: ["300 000 km/s", "150 000 km/s", "1 000 km/s", "3 000 km/s"], correct: "300 000 km/s" }
];
while (scienceQuestions.length < 200) {
    scienceQuestions.push(...scienceQuestions);
}
scienceQuestions.length = 200;

const questions = {
    "Maths": [...Array(200)].map((_, i) => ({
        question: `Combien fait ${i + 1} + ${i + 2} ?`,
        answers: [`${i + 3}`, `${i + 4}`, `${i + 5}`, `${i + 6}`],
        correct: `${i + 3}`
    })),
    "Science": scienceQuestions,
    "Histoire": [...Array(200)].map(() => ({
        question: "En quelle année a eu lieu la Révolution française ?",
        answers: ["1789", "1815", "1492", "1914"],
        correct: "1789"
    })),
    "Capitales": [...Array(200)].map(() => ({
        question: "Quelle est la capitale de la France ?",
        answers: ["Paris", "Londres", "Berlin", "Madrid"],
        correct: "Paris"
    })),
    "Citations": [...Array(200)].map(() => ({
        question: "Qui a dit 'Je pense, donc je suis' ?",
        answers: ["Descartes", "Platon", "Nietzsche", "Socrate"],
        correct: "Descartes"
    }))
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
    function showNextQuestion() {
        if (index >= 10) {
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