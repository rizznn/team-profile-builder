const inquirer = require('inquirer');
const fs = require('fs');
const generateTeamProfile = require('./src/page-template')
// const { writeFile, copyFile } = require('./utils/generate-site.js');

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const profileData = [];

function promptUser() {
  // if (!profileData) {
  //   profileData = [];
  // }
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
        return promptProfile();
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
        name: "internEmail",
        message: "What is the Intern's email?",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a valid email address";
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

    ]).then(({ internName, internId, internEmail, internSchool }, answer) => {
      const intern = new Intern(internName, internId, internEmail, internSchool);
      profileData.push(intern);
      if (answer.confirmAddMember) {
        return promptProfile();
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

  // const writeFile = fileContent => {
  //   return new Promise((resolve, reject) => {
  //     fs.writeFile('./dist/index.html', fileContent, err => {
  //       // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
  //       if (err) {
  //         reject(err);
  //         // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
  //         return;
  //       }
  
  //       // if everything went well, resolve the Promise and send the successful data to the `.then()` method
  //       resolve({
  //         ok: true,
  //         message: 'File created!'
  //       });
  //     });
  //   });
  // };



  const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject (err);
                return;
            }
            resolve ('Style sheet copied successfully!');
        });
    });
};



promptUser();
  // // call the function
  // .then(promptProfile)
  // .then(profileData => {
  //     return generateTeamProfile(profileData)
  // })
  // .then(pageHTML => {
  //   return writeFile(pageHTML);
  // })
  // .then(writeFileResponse => {
  //   console.log(writeFileResponse);
  //   return copyFile();
  // })
  // .then(copyFileResponse => {
  //   console.log(copyFileResponse);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

