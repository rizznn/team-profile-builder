const { expect } = require('@jest/globals');
const Employee = require('../lib/Employee');
const Engineer = require('../lib/Engineer');

test('creates an engineer object', () => {
    const employee = new Engineer('Joe', 3, 'engineer@email.com', 'JoeGithubUsername', 'Engineer');

    expect(employee.github).toBe('JoeGithubUsername');
    expect(employee.role).toBe('Engineer');
});

test('sets the github username', () => {
    const employee = new Engineer('Joe', 3, 'engineer@email.com', 'JoeGithubUsername');

    expect(employee.getGithub()).toBe('JoeGithubUsername');
});

test('getRole() to return Engineer', () => {
    const employee = new Engineer('Joe', 3, 'engineer@email.com', 'JoeGithubUsername');

    expect(employee.getRole()).toBe('Engineer');
});