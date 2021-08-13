const { test, expect } = require('@jest/globals');
const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('John', 1, 'employee@email.com', 'Employee');

    expect(employee.name).toBe('John');
    expect(employee.id).toBe(1);
    expect(employee.email).toBe('employee@email.com');
    expect(employee.role).toBe('Employee');
});

test('sets the name of the employee', () => {
    const employee = new Employee('John');

    expect(employee.getName()).toBe('John');
});

test('sets the id of the employee', () => {
    const employee = new Employee('John', 1);

    expect(employee.getId()).toBe(1);
});

test('sets the email of the employee', () => {
    const employee = new Employee('John', 1, 'employee@email.com');

    expect(employee.getEmail()).toBe('employee@email.com');
});

test('sets the role of the Employee', () => {
    const employee = new Employee('John', 1, 'employeel@email.com');

    expect(employee.getRole()).toBe('Employee');
});