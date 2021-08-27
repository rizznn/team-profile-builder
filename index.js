const fs = require('fs');
const generateTeamProfilePage = require('./src/page-template')

const profileDataArgs = process.argv.slice(2);
const generateTeamProfile = profileDataArgs;



fs.writeFile('./dist/index.html', generateTeamProfilePage(generateTeamProfile), err => {
    if (err) throw err;
  
    console.log('Team Portfolio complete! Check out index.html to see the output!');
  });
  