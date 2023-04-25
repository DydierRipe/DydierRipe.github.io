const scorePoints = document.querySelector(".score-frame");
const question = document.querySelector(".question");
const questionFrame = document.querySelector(".question-decoration");
const answers = document.querySelector(".answers-frame");
const indicator = document.querySelectorAll(".indicator");
const resultText = document.querySelector(".result-text");

const answerUse = "animation-name: AnswerIn; animation-duration: .55s; animation-timing-function: cubic-bezier(.66,1.88,.65,.92); animation-fill-mode: forwards;";

const points = Array.from(scorePoints.children);
let finalScore = 0;

let firstTime = true;
let AllowedToChange = false;
let questionIndex = 0;
let questions = fetch("questions.json");

questions.then(res => {
    if (!res.ok)
    {
        document.body.innerHTML = "";
        document.body.appendChild(createErrorMessage(res.status, res.statusText));

        throw new Error("something went wrong");
    }

    return res.json();
})
.then(json => {
    questions = json;
})
.catch(error => {
    console.error("yeah, something went wrong: " + error);
});

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

const changeQuestion = (putUp=true, putDown=true) => {
    let wait = 0;
    if (putUp) {
        question.style = "animation-name: QuestionOut; animation-duration: .7s; animation-timing-function: cubic-bezier(.34,-0.18,.26,-0.4);";
        questionFrame.style = "animation-name: RQuestionOut; animation-duration: .7s; animation-timing-function: cubic-bezier(.34,-0.18,.26,-0.4);";
        question.firstElementChild.style = "animation-name: QuestionOut; animation-duration: .7s; animation-timing-function: cubic-bezier(.34,-0.18,.26,-0.4);";

        let time = 100;
        for (const answer of answers.children) {
            setTimeout(() => {
                answer.classList.remove("correct-answer");
                answer.classList.remove("wrong-answer");
                answer.style = "animation-name: AnswerOut; animation-duration: .7s; animation-timing-function: cubic-bezier(.34,-0.18,.26,-0.4);";
            }, time);
            time += 100;
        }
        wait = 750;
    }

    setTimeout(() => {
        if (putDown) {
            const marks = ["A) ","B) ","C) ","D) "];
            question.firstElementChild.textContent = questions[questionIndex].question;

            question.style = "animation-name: QuestionIn; animation-duration: .7s; animation-timing-function: cubic-bezier(.66,1.88,.65,.92); animation-fill-mode: forwards;";
            questionFrame.style = "animation-name: RQuestionIn; animation-duration: .6s; animation-timing-function: cubic-bezier(.66,1.88,.65,.92); animation-fill-mode: forwards;";
            question.firstElementChild.style = "animation-name: QuestionIn; animation-duration: .7s; animation-timing-function: cubic-bezier(.66,1.88,.65,.92); animation-fill-mode: forwards;";

            let time = 800;
            questions[questionIndex].answers = shuffle(questions[questionIndex].answers);
            let i = 0;

            for (const answer of answers.children) {
                setTimeout(() => {
                    answer.textContent = marks[i] + questions[questionIndex-1].answers[i];
                    answer.style = answerUse;
                    i++;
                }, time);
                time += 100;
            }

            questionIndex++;
        }
    }, wait);
}

// Start Game
document.addEventListener("keydown", e => {
    if (e.key == "Enter" && firstTime) {
        questions = shuffle(questions);
        changeQuestion(false);

        let time = 1500;
        for (const point of scorePoints.children) {
            setTimeout(() => {
                point.style = "animation-name: PointIn; animation-duration: .7s; animation-timing-function: cubic-bezier(.66,1.88,.65,.92); animation-fill-mode: forwards;";
            }, time);
            time += 150;
        }
        firstTime = false;
    } else if (AllowedToChange && questionIndex < questions.length) {
        changeQuestion();
        AllowedToChange = false;
    } else if (questionIndex == questions.length) {
        changeQuestion(true, false);

        let time = 0;
        for (const point of scorePoints.children) {
            setTimeout(() => {
                point.style = "animation-name: PointOut; animation-duration: .7s; animation-timing-function: cubic-bezier(.34,-0.18,.26,-0.4);";
            }, time);
            time += 100;
        }

        setTimeout(() => {
            if (finalScore > 0) {
                indicator[0].classList.add("correct");
                indicator[0].style = "animation-name: ShowScore; animation-duration: 3.5s; animation-timing-function: ease; animation-fill-mode: forwards;";
            
                resultText.innerHTML = `Has Ganado<br>Creado por Dydier 1103 JM`;
                setTimeout(() => {
                    resultText.style = "animation-name: FadeIn; animation-duration: 3.5s; animation-timing-function: ease; animation-fill-mode: forwards;";
                }, 700);
            } else if (finalScore < 0) {
                indicator[1].classList.add("wrong");
                indicator[1].style = "animation-name: ShowScore; animation-duration: 3.5s; animation-timing-function: ease; animation-fill-mode: forwards;";
            
                resultText.innerHTML = "Has Perdido<br>Creado por Dydier 1103 JM";
                setTimeout(() => {
                    resultText.style = "animation-name: FadeIn; animation-duration: 3.5s; animation-timing-function: ease; animation-fill-mode: forwards;";
                }, 700);
            } else {
                indicator[2].style = "animation-name: ShowScore; animation-duration: 3.5s; animation-timing-function: ease; animation-fill-mode: forwards;";
            
                resultText.innerHTML = "Empate<br>Creado por Dydier 1103 JM";
                setTimeout(() => {
                    resultText.style = "animation-name: FadeIn; animation-duration: 3.5s; animation-timing-function: ease; animation-fill-mode: forwards;";
                }, 700);
            }
        }, 1710);
    }
});

for (const answer of answers.children) {
    answer.addEventListener("click", () => {
        if (answer.textContent.substring(3,answer.textContent.length) == questions[questionIndex-1].correct) {
            finalScore++;
            answer.classList.add("correct-answer");

            const image = document.createElement("img");
            image.src = "images/correct.svg";

            const fragment = document.createDocumentFragment();
            fragment.appendChild(image);

            points[questionIndex-1].appendChild(fragment);
            points[questionIndex-1].classList.add("correct");
            indicator[0].classList.add("correct");
            indicator[0].style = "animation-name: Result; animation-duration: 1.5s; animation-timing-function: cubic-bezier(.42,1.56,.54,-0.56);";
            indicator[2].style = "animation-name: Result; animation-duration: 1.7s; animation-timing-function: cubic-bezier(.42,1.56,.54,-0.56);";
            setTimeout(() => {
                indicator[0].style = "";
                indicator[2].style = "";
            }, 1700);

        } else {
            finalScore--;
            answer.classList.add("wrong-answer");

            for (const fAnswer of answers.children) {
                if (fAnswer.textContent.substring(3,fAnswer.textContent.length) == questions[questionIndex-1].correct) {
                    fAnswer.classList.add("correct-answer");
                }
            }

            const image = document.createElement("img");
            image.src = "images/wrong.svg";

            const fragment = document.createDocumentFragment();
            fragment.appendChild(image);

            points[questionIndex-1].appendChild(fragment);
            points[questionIndex-1].classList.add("wrong");
            indicator[1].classList.add("wrong");
            indicator[1].style = "animation-name: Result; animation-duration: 1.5s; animation-timing-function: cubic-bezier(.42,1.56,.54,-0.56);";
            indicator[2].style = "animation-name: Result; animation-duration: 1.7s; animation-timing-function: cubic-bezier(.42,1.56,.54,-0.56);";
            setTimeout(() => {
                indicator[1].style = "";
                indicator[2].style = "";
            }, 1700);
        }

        console.log(answer.textContent.substring(3,answer.textContent.length) + "         " + questions[questionIndex-1].correct)

        for (const answer1 of answers.children) {
            answer1.style = answerUse + " pointer-events: none;";
        }
        answer.style = answerUse + " pointer-events: none; background-color: #fff;"

        AllowedToChange = true;
    });
}