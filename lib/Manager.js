// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");

module.exports = class Manager extends Employee {
    constructor (name, id, email, office) {
        super (name, id, email);
        this.officeNumber = office;
    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}