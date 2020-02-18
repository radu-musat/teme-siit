export default class ElevModel {
    constructor(nume, note, id){
        this.nume = nume;
        this.note = note;
        this.id = id;
    }

    get medie() {
        var sum = 0;

        if( this.note === undefined || this.note.length === 0 ) {
            return 0;
        }

        for(var i=0; i<this.note.length; i++){
            sum += this.note[i];
        }

        return Math.round((sum / this.note.length) * 100) / 100;
    }

    set noteElev(note) {
        this.note = note;
    }

    get noteElev() {
        return this.note;
    }

    get numeElev() {
        return this.nume;
    }
}

