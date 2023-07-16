"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Employee = /** @class */ (function () {
    function Employee(id, name) {
        this.id = id;
        this.name = name;
        this.subordinates = [];
    }
    Employee.prototype.getId = function () {
        return this.id;
    };
    Employee.prototype.setId = function (id) {
        this.id = id;
    };
    Employee.prototype.getName = function () {
        return this.name;
    };
    Employee.prototype.setName = function (name) {
        this.name = name;
    };
    Employee.prototype.getSubordinates = function () {
        return this.subordinates;
    };
    Employee.prototype.setSubordinates = function (subordinates) {
        this.subordinates = subordinates;
    };
    Employee.prototype.toString = function () {
        return "[ id = ".concat(this.id, " name = ").concat(this.name, " ]");
    };
    Employee.prototype.accept = function (visitor) {
        visitor.visit(this, 0);
    };
    Employee.prototype.acceptSupervisor = function (visitor, newSupervisor, currentSupervisor) {
        visitor.visit(this, newSupervisor, currentSupervisor);
    };
    return Employee;
}());
exports.default = Employee;
