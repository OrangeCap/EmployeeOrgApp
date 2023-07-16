"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupervisorAssignmentVisitorImpl = void 0;
var SupervisorAssignmentVisitorImpl = /** @class */ (function () {
    function SupervisorAssignmentVisitorImpl() {
    }
    SupervisorAssignmentVisitorImpl.prototype.visit = function (employee, newSupervisor, currentSupervisor) {
        var _a;
        (_a = currentSupervisor.getSubordinates()).push.apply(_a, employee.getSubordinates());
        employee.getSubordinates().length = 0;
        newSupervisor.getSubordinates().push(employee);
    };
    return SupervisorAssignmentVisitorImpl;
}());
exports.SupervisorAssignmentVisitorImpl = SupervisorAssignmentVisitorImpl;
