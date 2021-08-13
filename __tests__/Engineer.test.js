const Employee = require('../lib/Employee');
const Engineer = require('../lib/Engineer');

test('creates an engineer object', () => {
    const employee = new Engineer('Joe');

    expect(employee.role).toBe('employee');
});
