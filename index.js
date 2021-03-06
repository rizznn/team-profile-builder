const inquirer = require('inquirer');
const fs = require('fs');
const generateTeamProfile = require('./src/page-template')

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const profileData = [];

function promptUser() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'managerName',
      message: "What is the Manager's name?",
      validate: answer => {
        if (answer !== "") {
            return true;
        }
        return "Please enter the Manager's name.";
      }
    },
    {
      type: 'input',
      name: 'managerId',
      message: "What is the Manager's ID?",
      validate: answer => {
          if (answer !== "") {
              return true;
          }
          return "Please enter a valid Manager's ID.";
      }
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: "What's the manager's email?",
      validate: answer => {
        const pass = answer.match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );
        if (pass) {
            return true;
        }
        return "Please enter a valid email address.";
      }
    },
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What's the manager's office number?",
      validate: answer => {
          const number = answer.match(
              /^[1-9]\d*$/
          );
          if (number) {
              return true;
          }
          return "Please enter a valid phone number.";
      }
    }
  ])
  .then(({managerName, managerId, managerEmail, managerOfficeNumber}) => {
    const manager = new Manager(managerName, managerId, managerEmail, managerOfficeNumber);
    profileData.push(manager);
    promptProfile();
  });
};

const promptProfile = () => {
  return inquirer.prompt([
    {
        type: "list",
        name: "addTeamMembers",
        message: "Add a team member",
        choices: [ "Engineer", "Intern" ]
    }
    ])
    .then(({ addTeamMembers }) => {
          if (addTeamMembers === 'Engineer') {
            addEngineer();
          } else if (addTeamMembers === 'Intern') {
            addIntern();
          } else {
            generateTeamFile();
          }
      });    
}

// add an Engineer when user selected Engineer
function addEngineer() {
  return inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "What is the Engineer's name?",
      validate: answer => {
          if (answer !== "") {
              return true;
          }
          return "Please enter the Engineer's name.";
      }
    },
    {
      type: "input",
      name: "engineerId",
      message: "What is the Engineer's ID?",
      validate: answer => {
          if (answer !== "") {
              return true;
          }
          return "Please enter a valid Engineer's ID.";
      }
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What's the Engineer's email?",
      validate: answer => {
        const pass = answer.match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );
        if (pass) {
            return true;
        }
        return "Please enter a valid email address.";
      }
    },
    {
      type: "input",
      name: "engineerGithub",
      message: "What is the Engineer's GitHub username?",
      validate: answer => {
          if (answer !== "") {
              return true;
          }
          return "Please enter the Engineer's GitHub username.";
      }
    },
    {
      type: 'confirm',
      name: 'confirmAddMember',
      message: 'Would you like to add another team member?',
      default: false
    }
  ]).then(answers => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
    profileData.push(engineer);
    if (answers.confirmAddMember) {
      return promptProfile(profileData);
    } else {
      generateTeamFile();
    }
  });
}

// Add an Intern when user selected Intern
function addIntern() {
  return inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "What is the Intern's name?",
      validate: answer => {
          if (answer !== "") {
              return true;
          }
          return "Please enter the Intern's name.";
      }
    },
    {
      type: "input",
      name: "internId",
      message: "What is the Intern's ID?",
      validate: answer => {
        if (answer !== "") {
            return true;
        }
        return "Please enter a valid email address";
      }
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is the Intern's email?",
      validate: answer => {
        const pass = answer.match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );
        if (pass) {
            return true;
        }
        return "Please enter a valid email address.";
      }
    },
    {
      type: "input",
      name: "internSchool",
      message: "What is the Intern's school?",
      validate: answer => {
          if (answer !== "") {
              return true;
          }
          return "Please enter the Intern's school.";
      }
    },
    {
      type: 'confirm',
      name: 'confirmAddMember',
      message: 'Would you like to add another team member?',
      default: false
    }

  ]).then(answers => {
    const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
    profileData.push(intern);
    if (answers.confirmAddMember) {
      return promptProfile(profileData);
    } else {
      generateTeamFile();
    }
  });
}


function generateTeamFile() {
  console.log('Team profile created!');

  fs.writeFileSync('./dist/index.html', generateTeamProfile(profileData), err => {
      console.log(err);
    });
}

promptUser();