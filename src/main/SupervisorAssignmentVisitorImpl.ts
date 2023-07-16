import  Employee from './Employee';
import { SupervisorAssignmentVisitor } from './Types';

export class SupervisorAssignmentVisitorImpl implements SupervisorAssignmentVisitor {
    visit(employee: Employee, newSupervisor: Employee, currentSupervisor: Employee): void {
        currentSupervisor.getSubordinates().push(...employee.getSubordinates());
        employee.getSubordinates().length = 0;
        newSupervisor.getSubordinates().push(employee);
    }
}
