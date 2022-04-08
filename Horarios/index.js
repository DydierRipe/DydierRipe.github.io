"use strict"

const printDoc = document.querySelector(".print__button");
const printContent = document.querySelector(".time-container");

const subjects = {
    "quimica1": {"room" : "B302", "start" : 6, "time" : 1, "day" : 1, "Sname" : "Quimica", "name" : "quimica"},
    "musica": {"room" : "Sala de Musica", "start" : 7, "time" : 2, "day" : 1, "Sname" : "Musica", "name" : "musica"},
    "ingles1": {"room" : "B304", "start" : 9, "time" : 1, "day" : 1, "Sname" : "Ingles", "name" : "ingles"},
    "ingles2": {"room" : "B304", "start" : 10, "time" : 1, "day" : 1, "Sname" : "Ingles", "name" : "ingles"},
    "fisica1": {"room" : "Laboratorio de Fisica", "start" : 11, "time" : 1, "day" : 1, "Sname" : "Fisica", "name" : "fisica"},
    "espanol1": {"room" : "B301", "start" : 6, "time" : 2, "day" : 2, "Sname" : "Español", "name" : "espanol"},
    "trigonometria1": {"room" : "B103", "start" : 8, "time" : 2, "day" : 2, "Sname" : "Trigonometria", "name" : "trigonometria"},
    "deportes": {"room" : "Salon de Deportes 1", "start" : 10, "time" : 2, "day" : 2, "Sname" : "Deportes", "name" : "deportes"},
    "informatica1": {"room" : "Sala de Informatica 1", "start" : 6, "time" : 2, "day" : 3, "Sname" : "Informatica", "name" : "informatica"},
    "quimica2": {"room" : "B302", "start" : 8, "time" : 2, "day" : 3, "Sname" : "Quimica", "name" : "quimica"},
    "fisica2": {"room" : "Laboratorio de Fisica", "start" : 10, "time" : 2, "day" : 3, "Sname" : "Fisica", "name" : "fisica"},
    "informatica2": {"room" : "Sala de Informatica 1", "start" : 6, "time" : 1, "day" : 4,"Sname" : "Informatica", "name" : "informatica"},
    "etica": {"room" : "B104", "start" : 7, "time" : 1, "day" : 4, "Sname" : "Etica", "name" : "etica"},
    "trigonometria2": {"room" : "B103", "start" : 8, "time" : 2, "day" : 4, "Sname" : "Trigonometria", "name" : "trigonometria"},
    "economia": {"room" : "B104", "start" : 10, "time" : 2, "day" : 4, "Sname" : "Economia", "name" : "economia"},
    "filosofia": {"room" : "A203", "start" : 6, "time" : 2, "day" : 5, "Sname" : "Filosofia", "name" : "filosofia"},
    "ingles3": {"room" : "B304", "start" : 8, "time" : 2, "day" : 5, "Sname" : "Ingles", "name" : "ingles"},
    "espanol2": {"room" : "B301", "start" : 10, "time" : 2, "day" : 5, "Sname" : "Español", "name" : "espanol"}
}

printDoc.addEventListener("click", () => {
    printContent.style.transform = "rotate(90deg) translateX(60px)";
    printContent.style.gridTemplateColumns = "repeat(6, 150px)";

    const printButton = document.querySelector(".print");
    printButton.style.display = "none";
    window.print();
});

window.onafterprint = () => {
    printContent.style.transform = "rotate(0deg) translateX(-60px)";
    printContent.style.gridTemplateColumns = "repeat(6, 200px)"

    const printButton = document.querySelector(".print");
    printButton.style.display = "block";
}

const addSubjects = () => {
    for(let key of Object.keys(subjects)) 
    {
        let element = subjects[key];
        const shedule = document.querySelector(".time-container");

        const fragment = document.createDocumentFragment();
        const subject = document.createElement("DIV");

        subject.classList.add(element.name, "i");
        subject.textContent = element.Sname;
        subject.style.gridColumnStart = element.day + 1;
        if (element.start < 10)
        {
            subject.style.gridRow = `${element.start - 4}/${(element.start - 4 + element.time)}`;
        }
        else {
            subject.style.gridRow = `${element.start - 3}/${(element.start - 3 + element.time)}`;
        }

        if (element.time == 1)
        {
            subject.style.paddingTop = "20px";
        }
        else {
            subject.style.paddingTop = "50px";
        }

        subject.appendChild(addRooms(subject, element));

        fragment.appendChild(subject);
        shedule.appendChild(fragment);

    };
}

const addRooms = (frame, element) => {

    frame.style.pointerEvents = "initial";
    const iconContainer = document.createElement("DIV");
    iconContainer.classList.add("i__text");
        
    const textContent = document.createElement("H3");
    textContent.classList.add("i__text__content");
    textContent.innerHTML = element.room;
        
    iconContainer.appendChild(textContent);

    return iconContainer;
}

addSubjects();
