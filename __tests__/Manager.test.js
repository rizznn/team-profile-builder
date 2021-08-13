const { expect } = require('@jest/globals');
const Employee = require('../lib/Employee');
const Manager = require('../lib/Manager');

test('creates a manager object', () => {
    const employee = new Manager('Jane', 2, 'manager@email.com', 101, 'Manager');

    // expect(employee.name).toBe('Jane');
    expect(employee.officeNumber).toBe(101);
    expect(employee.role).toBe('Manager');
});

// test('sets the name of the employee', () => {
//     const employee = new Manager('Jane');

//     expect(employee.getName()).toBe('Jane');
// });

test('sets the office number', () => {
    const employee = new Manager('Jane', 2, 'manager@email.com', 101);

    expect(employee.getOfficeNumber()).toBe(101);
});

test('getRole() to return Manager', () => {
    const employee = new Manager('Jane', 2, 'manager@email.com', 101);

    expect(employee.getRole()).toBe('manager');
});