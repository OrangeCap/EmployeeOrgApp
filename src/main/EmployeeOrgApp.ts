import Employee from './Employee' 
import { IEmployeeOrgApp, OrgHierarchyVisitor } from "./Types";
import { SupervisorAssignmentCommand } from './SupervisorAssignmentCommand';
import { OrgHierarchyVisitorImpl } from "./OrgHierarchyVisitorImpl";

export class EmployeeOrgApp implements IEmployeeOrgApp {
    private ceo: Employee;
    private orgVisitor: OrgHierarchyVisitor;
    private employeesById: Map<number, Employee>;
    private command: Command | null;
  
    constructor(ceo: Employee) {
      this.ceo = ceo;
      this.orgVisitor = new OrgHierarchyVisitorImpl();
      this.employeesById = new Map();
      this.command = null;
      this.employeesById.set(ceo.getId(), ceo);
    }
  
    move(employeeId: number, superVisorId: number): void {
      if (employeeId === this.ceo.getId()) {
        throw new Error(`Employee Id: ${employeeId} belongs to CEO. Can't be moved.`);
      }
  
      const employee = this.employeesById.get(employeeId);
      const newSuperVisor = this.employeesById.get(superVisorId);
      if(employee && newSuperVisor){
        const currentSupervisor = this.findCurrentSupervisor(this.ceo, employee);
  
        if (!currentSupervisor) {
          throw new Error(`Current Supervisor of ${employee} doesn't exist`);
        }
    
        if (!newSuperVisor) {
          throw new Error(`Supervisor by id: ${superVisorId} doesn't exist`);
        }
    
        this.command = new SupervisorAssignmentCommand(employee!, currentSupervisor, newSuperVisor);
        this.command.execute();
      }
    }
  
    undo(): void {
      if (this.command) {
        this.command.undo();
      }
    }
  
    redo(): void {
      if (this.command) {
        this.command.execute();
      }
    }
  
    displayOrgHierarchy(): void {
      this.ceo.accept(this.orgVisitor);
    }
  
    addEmployee(employeeName: string, id: number, superVisorId: number): void {
      const supervisor = this.employeesById.get(superVisorId);
  
      if (!supervisor) {
        throw new Error(`No supervisor exists by Id ${superVisorId}`);
      }
  
      const newEmployee = new Employee(id, employeeName);
      this.employeesById.set(id, newEmployee);
      supervisor.getSubordinates().push(newEmployee);
    }
  
    private findCurrentSupervisor(ceo: Employee, employee: Employee): Employee | null {
      if (ceo.getSubordinates().find((subordinate) => subordinate.getId() === employee.getId())) {
        return ceo;
      }
  
      for (const subordinate of ceo.getSubordinates()) {
        const found = this.findCurrentSupervisor(subordinate, employee);
        if (found) {
          return found;
        }
      }
  
      return null;
    }
  }
  