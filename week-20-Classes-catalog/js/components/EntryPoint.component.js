import EleviServiceService from "../services/EleviService.service.js";
import DrawServiceService from "../services/DrawService.service.js";
import AddStudent from "./AddStudent.component.js";
import AddGrade from "./AddGrade.component.js";
import SetGradesView from "./SetGradesView.component.js";

export default class EntryPointComponent {
    constructor() {
        console.log('entry');

        /* -- Services -- */
        this.eleviService = new EleviServiceService();
        this.drawService = new DrawServiceService(this.eleviService);

        /* -- Components - */
        this.AddStudent = new AddStudent(this.eleviService, this.drawService);
        this.AddGrade = new AddGrade(this.eleviService, this.drawService);
        this.SetGradesView = new SetGradesView(this.drawService);

        /* -- Init -- */
        this.init();
    }

    init() {
        this.drawService.init();
        this.AddStudent.init();
        this.AddGrade.init();
        this.SetGradesView.init();
    }

}
