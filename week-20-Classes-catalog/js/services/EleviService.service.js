import ElevModel from "../Elev.model.js";

export default class EleviServiceService {
    constructor() {
        this.elevi =     [
            new ElevModel("Bob", [7, 7, 8, 10], 1),
            new ElevModel("Marius", [9, 8], 2),
            new ElevModel("Andu", [5, 9, 9], 3)
        ];

        this.currentId = 3;
    }

    addElev(nume, id, note) {
        if (note === undefined) {
            note = [];
        }

        this.elevi.push(new ElevModel(nume, note, id));
        console.log(this.elevi)
    }

    addGradeToStudent(grade, student) {
        student.noteElev.push(grade);
    }

    incrementId () {
        this.currentId ++;
    }

    sortStudents(sortType) {
        if(sortType === "ascending") {
            this.listaElevi.sort(function (itemA, itemB) {
                return (itemA.medie > itemB.medie ) ? -1 : 1;
            });
        } else if ( sortType === "descending") {
           this.listaElevi.sort(function (itemA, itemB) {
                return (itemA.medie > itemB.medie ) ? 1 : -1;
            });
        }
    }

    get listaElevi(){
        return this.elevi;
    }

    set listaElevi(elevi) {
        this.elevi = elevi;
    }

    get id() {
        return this.currentId;
    }

}

