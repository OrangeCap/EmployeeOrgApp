import Employee from './Employee';
import { Command } from './Types';
import { SupervisorAssignmentVisitorImpl } from './SupervisorAssignmentVisitorImpl';

export class SupervisorAssignmentCommand implements Command {
    private employee: Employee;
    private currentSupervisor: Employee;
    private newSupervisor: Employee;
    private subOrdinates: Employee[];
    private supervisorAssignmentVisitor: SupervisorAssignmentVisitorImpl;

    constructor(employee: Employee, currentSupervisor: Employee, newSupervisor: Employee) {
        this.employee = employee;
        this.currentSupervisor = currentSupervisor;
        this.newSupervisor = newSupervisor;
        this.subOrdinates = employee.getSubordinates();
        this.supervisorAssignmentVisitor = new SupervisorAssignmentVisitorImpl();
    }

    execute(): void {
        this.employee.acceptSupervisor(this.supervisorAssignmentVisitor, this.newSupervisor, this.currentSupervisor);
    }

    undo(): void {
        this.employee.getSubordinates().push(...this.subOrdinates);
        this.currentSupervisor.getSubordinates().splice(0, this.subOrdinates.length);
        this.newSupervisor.getSubordinates().splice(this.newSupervisor.getSubordinates().indexOf(this.employee), 1);
        this.currentSupervisor.getSubordinates().push(this.employee);
    }
}
