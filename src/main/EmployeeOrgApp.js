"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeOrgApp = void 0;
var Employee_1 = require("./Employee");
var SupervisorAssignmentCommand_1 = require("./SupervisorAssignmentCommand");
var OrgHierarchyVisitorImpl_1 = require("./OrgHierarchyVisitorImpl");
var EmployeeOrgApp = /** @class */ (function () {
    function EmployeeOrgApp(ceo) {
        this.ceo = ceo;
        this.orgVisitor = new OrgHierarchyVisitorImpl_1.OrgHierarchyVisitorImpl();
        this.employeesById = new Map();
        this.command = null;
        this.employeesById.set(ceo.getId(), ceo);
    }
    EmployeeOrgApp.prototype.move = function (employeeId, superVisorId) {
        if (employeeId === this.ceo.getId()) {
            throw new Error("Employee Id: ".concat(employeeId, " belongs to CEO. Can't be moved."));
        }
        var employee = this.employeesById.get(employeeId);
        var newSuperVisor = this.employeesById.get(superVisorId);
        if (employee && newSuperVisor) {
            var currentSupervisor = this.findCurrentSupervisor(this.ceo, employee);
            if (!currentSupervisor) {
                throw new Error("Current Supervisor of ".concat(employee, " doesn't exist"));
            }
            if (!newSuperVisor) {
                throw new Error("Supervisor by id: ".concat(superVisorId, " doesn't exist"));
            }
            this.command = new SupervisorAssignmentCommand_1.SupervisorAssignmentCommand(employee, currentSupervisor, newSuperVisor);
            this.command.execute();
        }
    };
    EmployeeOrgApp.prototype.undo = function () {
        if (this.command) {
            this.command.undo();
        }
    };
    EmployeeOrgApp.prototype.redo = function () {
        if (this.command) {
            this.command.execute();
        }
    };
    EmployeeOrgApp.prototype.displayOrgHierarchy = function () {
        this.ceo.accept(this.orgVisitor);
    };
    EmployeeOrgApp.prototype.addEmployee = function (employeeName, id, superVisorId) {
        var supervisor = this.employeesById.get(superVisorId);
        if (!supervisor) {
            throw new Error("No supervisor exists by Id ".concat(superVisorId));
        }
        var newEmployee = new Employee_1.default(id, employeeName);
        this.employeesById.set(id, newEmployee);
        supervisor.getSubordinates().push(newEmployee);
    };
    EmployeeOrgApp.prototype.findCurrentSupervisor = function (ceo, employee) {
        if (ceo.getSubordinates().find(function (subordinate) { return subordinate.getId() === employee.getId(); })) {
            return ceo;
        }
        for (var _i = 0, _a = ceo.getSubordinates(); _i < _a.length; _i++) {
            var subordinate = _a[_i];
            var found = this.findCurrentSupervisor(subordinate, employee);
            if (found) {
                return found;
            }
        }
        return null;
    };
    return EmployeeOrgApp;
}());
exports.EmployeeOrgApp = EmployeeOrgApp;
