const inquirer = require('inquirer');
const generateTeamProfile = require('./src/page-template')
const { writeFile, copyFile } = require('./utils/generate-site.js');

const promptUser = () => {
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
            if (answer !== "") {
                return true;
            }
            return "Please enter a valid email address";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What's the manager's office number?",
        validate: answer => {
            const pass = answer.match(
                /^[1-9]\d*$/
            );
            if (pass) {
                return true;
            }
            return "Please enter a valid phone number.";
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },      
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
              return true;
            } else {
              return false;
            }
          }        
      }
    ]);
};
  

const promptProfile = (teamProfileData) => {
    // If there's no 'portfolio' array property, create one
    if (!teamProfileData.portfolio) {
        teamProfileData.portfolio = [];
    }
      console.log(`
=================
Add a New Project
=================
`)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
          },
          {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
          },
          {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProfile',
            message: 'Would you like to enter another project?',
            default: false
          }
    ])
    .then(profileData => {
        teamProfileData.portfolio.push(profileData);
        if (profileData.confirmAddProfile) {
          return promptProfile(teamProfileData);
        } else {
          return teamProfileData;
        }
    });
};  
  

promptUser()
    // call the function
    .then(promptProfile)
    .then(teamProfileData => {
        return generateTeamProfile(teamProfileData)
    })
    .then(pageHTML => {
      return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
    })
    .then(copyFileResponse => {
      console.log(copyFileResponse);
    })
    .catch(err => {
      console.log(err);
    });

