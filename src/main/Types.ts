import Employee from "./Employee";

export interface Command {
    execute(): void;
    undo(): void;
}

export interface IEmployeeOrgApp {
    move(employeeId: number, superVisorId: number): void;
    undo(): void;
    redo(): void;
    displayOrgHierarchy(): void;
    addEmployee(employeeName: string, id: number, superVisorId: number): void;
}

export interface SupervisorAssignmentVisitor {
    visit(employee: Employee, newSupervisor: Employee, ceo: Employee): void;
}

export interface OrgHierarchyVisitor {
    visit(employee: Employee, indent: number): void;
}