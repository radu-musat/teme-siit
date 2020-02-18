export default class AddStudent {
    constructor(eleviService, drawService) {
        this.eleviService = eleviService;
        this.drawService = drawService;
    }

    init() {
        this.setAddStudentEvent();
    }

    setAddStudentEvent() {
        let addStudentForm = document.querySelector("#forumlarElev");

        addStudentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let addStudentInput = document.querySelector("#nume-elev");

            if(addStudentInput.value.length < 1) {
                alert("Va rugam sa nu lasati campul de nume gol!");
                return;
            }

            this.eleviService.incrementId();
            this.eleviService.addElev(addStudentInput.value, this.eleviService.id);
            this.drawService.draw();
        });
    }
}
