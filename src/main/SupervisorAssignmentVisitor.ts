import Employee from "./Employee";

export interface SupervisorAssignmentVisitor {
    visit(employee: Employee, newSupervisor: Employee, ceo: Employee): void;
}