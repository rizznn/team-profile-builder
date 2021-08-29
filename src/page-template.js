
// create the about section
const generateManagerProfile = teamData.manager.map(function(manager) {
    return `
        <div class="col">
            <div class="card team-card manager-card">
                <div class="card-header team-header text-center">
                    <h2 class="card-title">${manager.getName()}</h2>
                    <h4 class="card-title">Title: ${manager.getRole()}</h4>                    
                </div>
                <div class="card-body team-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${manager.getId()}</li>
                        <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                        <li class="list-group-item">Office number: <a href="tel:${manager.getOfficeNumber()}">${manager.getOfficeNumber()}</a></li>                            
                    </ul>
                </div>
            </div>
        </div>
        `;
    });
    

// engineer profile
const generateEngineerProfile = engineer => {
    // if it doesn't exist, return an empty string
    if (!engineer) {
        return '';
    }
    return `
    ${engineer
    .filter(({engineerProfile}) => engineerProfile)
    .map(({ getName, getRole, getId, getEmail, getGitHub }) => {
        return `
        <div class="col">
            <div class="card team-card engineer-card">
                <div class="card-header team-header text-center">
                    <h2 class="card-title">${engineer.getName()}</h2>
                    <h4 class="card-title">Title: ${engineer.getRole()}</h4>                    
                </div>
                <div class="card-body team-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${engineer.getId()}</li>
                        <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                        <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGitHub()}" target="_blank" rel="noopener noreferrer">${engineer.getGitHub()}</a></li>                            
                    </ul>
                </div>
            </div>
        </div>
        `;
    })
    .join('')}

    ${engineer
        .filter(({engineerProfile}) => !engineerProfile)
        .map(({ getName, getRole, getId, getEmail, getGitHub }) => {
            return `
            <div class="col">
                <div class="card team-card engineer-card">
                    <div class="card-header team-header text-center">
                        <h2 class="card-title">${engineer.getName()}</h2>
                        <h4 class="card-title">Title: ${engineer.getRole()}</h4>                    
                    </div>
                    <div class="card-body team-body">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${engineer.getId()}</li>
                            <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                            <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGitHub()}" target="_blank" rel="noopener noreferrer">${engineer.getGitHub()}</a></li>                            
                        </ul>
                    </div>
                </div>
            </div>
            `;
    })
    .join('')}
    `;
};

// intern profile
const generateInternProfile = intern => {
    // if it doesn't exist, return an empty string
    if (!intern) {
        return '';
    }
    return `
    <div class="col">
        <div class="card team-card intern-card">
            <div class="card-header team-header text-center">
                <h2 class="card-title">${intern.getName()}</h2>
                <h4 class="card-title">Title: ${intern.getRole()}</h4>                    
            </div>
            <div class="card-body team-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${intern.getId()}</li>
                    <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                    <li class="list-group-item">School: ${intern.getSchool()}</li>                            
                </ul>
            </div>
        </div>
    </div>
    `;
}

module.exports = profileTemplateData => {
    const { manager, engineer, intern } = profileTemplateData;
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <title>My Team</title>
    </head>
    <body>
        <div class="card-header jumbotron-header">
            <header class="jumbotron text-center">
                <h1 class="display-4 ">My Team</h1>
                <p class="lead"></p>
            </header>
        </div>
        <div class="card-body vh-100">
            <div class="row row-cols-md-3 g-4">
                ${generateTeamProfilePage(profileTemplateData)}
            </div>
        </div>
    </body>
    </html>
    `
};



// const generateTeamProfilePage = (generateTeamProfile) => {

//     return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
//         <title>My Team</title>
//     </head>
//     <body>
//         <div class="card-header jumbotron-header">
//             <header class="jumbotron text-center">
//                 <h1 class="display-4 ">My Team</h1>
//                 <p class="lead"></p>
//             </header>
//         </div>
//         <div class="card-body vh-100">
//             <div class="row row-cols-md-3 g-4">
//                 ${generateTeamProfile}
//             </div>
//         </div>
//     </body>
//     </html>
//     `
// }