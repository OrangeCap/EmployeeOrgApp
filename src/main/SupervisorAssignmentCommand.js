"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupervisorAssignmentCommand = void 0;
var SupervisorAssignmentVisitorImpl_1 = require("./SupervisorAssignmentVisitorImpl");
var SupervisorAssignmentCommand = /** @class */ (function () {
    function SupervisorAssignmentCommand(employee, currentSupervisor, newSupervisor) {
        this.employee = employee;
        this.currentSupervisor = currentSupervisor;
        this.newSupervisor = newSupervisor;
        this.subOrdinates = employee.getSubordinates();
        this.supervisorAssignmentVisitor = new SupervisorAssignmentVisitorImpl_1.SupervisorAssignmentVisitorImpl();
    }
    SupervisorAssignmentCommand.prototype.execute = function () {
        this.employee.acceptSupervisor(this.supervisorAssignmentVisitor, this.newSupervisor, this.currentSupervisor);
    };
    SupervisorAssignmentCommand.prototype.undo = function () {
        var _a;
        (_a = this.employee.getSubordinates()).push.apply(_a, this.subOrdinates);
        this.currentSupervisor.getSubordinates().splice(0, this.subOrdinates.length);
        this.newSupervisor.getSubordinates().splice(this.newSupervisor.getSubordinates().indexOf(this.employee), 1);
        this.currentSupervisor.getSubordinates().push(this.employee);
    };
    return SupervisorAssignmentCommand;
}());
exports.SupervisorAssignmentCommand = SupervisorAssignmentCommand;
