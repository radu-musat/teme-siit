export default class SetGradesView {
    constructor(drawService) {
        this.drawService = drawService;
        this.gradesSection = document.querySelector("#note_elevi_wrapper");
        this.studentSection = document.querySelector("#lista_elevi_wrapper");
    }

    init() {
        this.setShowGradesEvent();
        this.setHideGradesEvent();
    }

    setShowGradesEvent() {
        let studentsTable = document.querySelector(".tabel-elevi");

        studentsTable.addEventListener("click", (event) =>  {
            let id = event.target.getAttribute("data-student-id");

            this.gradesSection.classList.remove("note_elevi_wrapper--inactive");
            this.studentSection.classList.remove("lista_elevi_wrapper--full");

            this.drawService.drawStudentGrades(event, "BUTTON", id);
        });
    }

    setHideGradesEvent() {
        let hideButton = document.querySelector("#hide");
        hideButton.addEventListener("click", () => {
            this.gradesSection.classList.add("note_elevi_wrapper--inactive");
            this.studentSection.classList.add("lista_elevi_wrapper--full");
        });
    }
}
