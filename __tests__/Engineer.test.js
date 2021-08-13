const Employee = require('../lib/Employee');

test('creates an engineer object', () => {
    const employee = new Engineer('James');
    
    expect(employee.role).toBe('employee');
});
