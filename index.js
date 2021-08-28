const inquirer = require('inquirer');

// const fs = require('fs');
// const generateTeamProfilePage = require('./src/page-template')

// const pageHTML = generateTeamProfilePage(generateTeamProfile);



// fs.writeFile('./dist/index.html', pageHTML, err => {
//     if (err) throw err;
  
//     console.log('Team Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
        }    
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username'
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
        console.log(teamProfileData)
    })
    // answers to portfolio
//   .then(portfolioAnswers => console.log(portfolioAnswers))
//     // to add another profile
//   .then(profileData => {
//     teamProfileData.portfolio.push(profileData);
//     if (profileData.confirmAddProject) {
//         return promptProfile(teamProfileData);
//       } else {
//         return teamProfileData;
//       }
//   });
