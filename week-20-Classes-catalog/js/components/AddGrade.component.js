export default class AddGrade {
    constructor(eleviService, drawService) {
        this.eleviService = eleviService;
        this.drawService = drawService;
    }

    init() {
        this.setAddGradeEvent();
    }

    setAddGradeEvent() {
        let addGradeForm = document.querySelector("#adaugaNota");

        addGradeForm.addEventListener("click", (event) => {
            event.preventDefault();
            console.log(event.target)

            if(event.target.nodeName === "BUTTON") {
                let userId = Number(addGradeForm.getAttribute("data-student-id"));
                let gradeInput = document.querySelector("#notaNoua");

                if(userId < 1) {
                    alert("Alege un elev mai intai - click pe butonul \"vezi notele\" unui elev din lista");
                } else if (gradeInput.value.length < 1) {
                    alert("Va rugam sa introduceti o nota!");
                } else if (Number(gradeInput.value) > 10) {
                    alert("Nota nu poate fi mai mare de 10!");
                } else if (Number(gradeInput.value) < 1){
                    alert("Nota nu poate fi mai mica decat 1!")
                } else {
                    for( let elev of this.eleviService.listaElevi ) {
                        if(elev.id === userId) {
                            this.eleviService.addGradeToStudent(Number(gradeInput.value), elev);
                            this.drawService.drawStudentGrades(event, "BUTTON", userId);
                            this.drawService.draw();
                        }
                    }
                }

            }
        });
    }
}
