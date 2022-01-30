const printDoc = document.querySelector(".print__button");
const printContent = document.querySelector(".time-container");

const rooms = {
    "espanol": "B301",
    "trigonometria": "B104 Viernes <br>  A106 Lunes",
    "ingles": "B304",
    "informatica": "Sala de informatica",
    "filosofia": "A203",
    "economia": "B104",
    "fisica": "Laboratorio de fisica",
    "quimica": "B302",
    "etica": "B104",
    "musica": "Sala de musica",
    "deportes": "Salon de deportes"
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

const addRooms = () => {
    const importantChilds = Array.from(printContent.children).filter(child => !(child.classList.contains("dia") 
    || child.classList.contains("hora") || child.classList.contains("descanso") || child.classList.contains("salida") 
    || child.classList.contains("non-important")));

    importantChilds.forEach(element => {
        element.style.pointerEvents = "initial";
        element.innerHTML += `
        <div class="i__text">
            <h3 class="i__text__content">${rooms[element.classList[0]]}</h3>
        </div>`
    });
}

addRooms();
