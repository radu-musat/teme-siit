export default class DrawServiceService {
    constructor(eleviService) {
        this.eleviService = eleviService;
        this.elevi = this.eleviService.listaElevi;
    }

    init() {
        this.draw();
        this.drawOnSort();
    }

    draw() {
        let containerTabel = document.querySelector(".tabel-elevi");
        let template = ``;

        for (let elev of this.elevi ) {
            template += `
                <div class="elev">
                    <h3>${elev.nume}</h3>
                    <span class="medie__elev">${elev.medie}</span>
                    <button data-student-id="${elev.id}">Vezi notele</button>
                 </div>
            `
        }

        containerTabel.innerHTML = template;
    }

    drawOnSort(){
        let sortButtonsContainer = document.querySelector(".sort");
        sortButtonsContainer.addEventListener("click", (event) => {
            let targetId = event.target.getAttribute("id");

            if ( targetId === "sortAscending" ) {
                this.eleviService.sortStudents("ascending");
                this.draw();
            } else  {
                this.eleviService.sortStudents("descending");
                this.draw();
            }

        });
    }

    drawStudentGrades(event, nodeName, studentId) {

        let gradesContainer = document.querySelector(".note__elev");
        let addGradeForm = document.querySelector("#adaugaNota");
        let studentNameHeading = document.querySelector("#note_elevi_wrapper h2");

        if (event.target.nodeName === nodeName) {
            let id = Number(studentId);

            let template = ``;
            for (let student of this.eleviService.listaElevi) {
                if(id === student.id){
                    addGradeForm.setAttribute("data-student-id", student.id)


                   if (student.medie !== 0) {
                       studentNameHeading.textContent = student.numeElev;
                       for (let grade of student.noteElev) {
                           template+= `<li>${grade}</li>`;
                       }
                   } else {
                       template = `<li>elevul selectat nu are note</li>`;
                   }


                    /*
                     * Salut Bogdan, daca cumva te uiti peste codul de aci else-ul comentat de mai jos nu functioneaza
                     * doar pentru elevi noi adaugati - nu imi dau seama de ce nu functioneaza(help?), de aceia am si folosit
                     * solutia de mai sus
                     */

                    // for (let i = 0 ; i < student.noteElev.length; i++ ) {
                    //     // console.log(event);
                    //
                    //
                    //      let nota = student.noteElev[i];
                    //
                    //
                    //       if (student.noteElev.length > 0) {
                    //           template+= `<li>${nota}</li>`
                    //       } else {
                    //           console.log(student.noteElev.length );
                    //           template+= `<li>elevul selectat nu are note</li>`
                    //       }
                    // }
                }
            }

            gradesContainer.innerHTML = template;
        }
    }
}
