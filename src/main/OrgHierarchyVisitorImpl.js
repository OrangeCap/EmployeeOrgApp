"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgHierarchyVisitorImpl = void 0;
var OrgHierarchyVisitorImpl = /** @class */ (function () {
    function OrgHierarchyVisitorImpl() {
    }
    OrgHierarchyVisitorImpl.prototype.visit = function (employee, indent) {
        var _this = this;
        for (var i = 0; i < indent; i++) {
            console.log("\t");
        }
        console.log(employee);
        employee.getSubordinates().forEach(function (x) { return _this.visit(x, indent + 1); });
    };
    return OrgHierarchyVisitorImpl;
}());
exports.OrgHierarchyVisitorImpl = OrgHierarchyVisitorImpl;
