import Employee from './Employee';
import { OrgHierarchyVisitor } from './Types';

export class OrgHierarchyVisitorImpl implements OrgHierarchyVisitor {
    visit(employee: Employee, indent: number): void {
        for(let i = 0; i < indent; i++){
            console.log("\t");
        }
        console.log(employee);
        employee.getSubordinates().forEach(x => this.visit(x, indent+1));
    }
}
