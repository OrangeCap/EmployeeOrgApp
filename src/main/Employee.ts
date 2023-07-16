import { OrgHierarchyVisitor, SupervisorAssignmentVisitor } from "./Types";

export default class Employee {
    private id: number;
    private name: string;
    private subordinates: Employee[];
  
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
      this.subordinates = [];
    }
  
    public getId(): number {
      return this.id;
    }
  
    public setId(id: number): void {
      this.id = id;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public setName(name: string): void {
      this.name = name;
    }
  
    public getSubordinates(): Employee[] {
      return this.subordinates;
    }
  
    public setSubordinates(subordinates: Employee[]): void {
      this.subordinates = subordinates;
    }
  
    public toString(): string {
      return `[ id = ${this.id} name = ${this.name} ]`;
    }
  
    public accept(visitor: OrgHierarchyVisitor): void {
      visitor.visit(this, 0);
    }
  
    public acceptSupervisor(visitor: SupervisorAssignmentVisitor, newSupervisor: Employee, currentSupervisor: Employee): void {
      visitor.visit(this, newSupervisor, currentSupervisor);
    }
  }
  