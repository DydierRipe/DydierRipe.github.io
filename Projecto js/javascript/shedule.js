"use strict"

const printDoc = document.querySelector(".print__button"); // print button object
const printContent = document.querySelector(".time-container"); // shedule object

/* json that contains all the information for each class
        room is the text displayed when the object is hovered
        start is the hour that the class start (6-11)
        time is how many hours takes up the class (usually 1-2)
        day is the day that the class is taken (1-5)
        Sname is the displayed name by the class
        name is the css class name for that object
*/

// sets up the print parameters and call the print function
printDoc.addEventListener("click", () => {
    // takes every object and sets the pointers to none for evade bugs with the pc cursor and the hover
    Array.from(printContent.children).forEach(element => {
        element.style.pointerEvents = "none";
    });

    // sets the shedule to get ready for the print
    printContent.style.transform = "rotate(90deg) translateX(60px)";
    printContent.style.gridTemplateColumns = "repeat(6, 150px)";

    // print 
    const printButton = document.querySelector(".print");
    printButton.style.display = "none";
    window.print();
});

// afterprint
window.onafterprint = () => {
    // sets pointer events to initial except the elements with the NPE class
    Array.from(printContent.children).forEach(element => {
        if (!element.classList.contains("NPE")) element.style.pointerEvents = "initial";
    });
    // resets the initial values of the shedule
    printContent.style.transform = "rotate(0deg) translateX(0)";
    printContent.style.gridTemplateColumns = "repeat(6, 200px)";
    document.documentElement.scrollTop = document.body.scrollTop = 0;

    // resets the buttond display
    const printButton = document.querySelector(".print");
    printButton.style.display = "block";
}

const addSubjects = subjects => {
    // select all objects in subjects object
    for(let key of Object.keys(subjects)) 
    {
        let element = subjects[key];

        const fragment = document.createDocumentFragment(); // create fragment
        const subject = document.createElement("DIV"); // create div element

        subject.classList.add(element.name, "i"); // puts as a class "i" and the correspondient css class
        subject.textContent = element.Sname; // puts the subject name
        subject.style.gridColumnStart = element.day + 1; //the value sums 1 because the colums number includes the time colum
        if (element.start < 10) //before the break starts
        {
            subject.style.gridRow = `${element.start - 4}/${(element.start - 4 + element.time)}`; // in the object the hour is literally the real hour that the class is taken but it's need to config that makes sense in the grid logic
        }
        else {
            subject.style.gridRow = `${element.start - 3}/${(element.start - 3 + element.time)}`; // same with this
        }

        if (element.time == 1) // sets padding according to the space that the object takes up
        {
            subject.style.paddingTop = "20px";
        }
        else {
            subject.style.paddingTop = "50px";
        }

        subject.appendChild(addRooms(subject, element)); // appends hover config

        fragment.appendChild(subject);
        printContent.appendChild(fragment);

    };
}

// hover config
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

const createErrorMessage = (errorCode, errorMess) => {
    const fragment = document.createDocumentFragment();
    const messajeContainer = document.createElement("DIV");

    messajeContainer.classList.add("error-messaje");

    const title = document.createElement("H2");
    title.textContent = "Looks like something went wrong :(";
    
    const messaje = document.createElement("P");
    messaje.innerHTML = `But do not worry, probably is not your fault. <br> Code Error: ${errorCode} ${errorMess}.`;

    messajeContainer.appendChild(title);
    messajeContainer.appendChild(messaje);
    fragment.appendChild(messajeContainer);

    return fragment;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const subjectsFile = fetch("../json/subjects.JSON");

subjectsFile.then(res => {
    if (!res.ok)
    {
        document.body.innerHTML = "";
        document.body.appendChild(createErrorMessage(res.status, res.statusText));

        throw new Error("something went wrong");
    }

    return res.json();
})
.then(json => {
    addSubjects(json);
})
.catch(error => {
    console.error("yeah, something went wrong: " + error);
});

