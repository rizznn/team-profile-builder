const { test, expect } = require('@jest/globals');
const Employee = require('../lib/Employee');
const Intern = require('../lib/Intern');

test('creates an intern object', () => {
    const employee = new Intern ('James', 4, 'intern@email.com', 'University', 'Intern');

    expect(employee.school).toBe('University');
    expect(employee.role).toBe('Intern');
});

test('sets the school', () => {
    const employee = new Intern ('James', 4, 'intern@email.com', 'University');

    expect(employee.getSchool()).toBe('University');
})

test('getRole() to return Intern', () => {
    const employee = new Intern('James', 4, 'intern@email.com', 'University');

    expect(employee.getRole()).toBe('Intern');
});