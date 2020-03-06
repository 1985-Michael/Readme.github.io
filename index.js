const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const axios = require('axios');

writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([{

            type: "input",
            name: "Name",
            message: "what is your name?"
        },
        {
            type: "input",
            name: "Username",
            message: "what is your github username?"
        },
        {
            type: "input",
            name: "Projectname",
            message: "what is the name of your project?"
        },
        {
            type: "input",
            name: "Description",
            message: "give a short description of your project?"
        },
        {
            type: "input",
            name: "License",
            message: "what kind of license should your project have?"
        },
        {
            type: "input",
            name: "Dependencies",
            message: "what command should you run to install dependencies?"
        },
        {
            type: "input",
            name: "Test",
            message: "what command should you run to run tests?"
        },
        {
            type: "input",
            name: "Tips",
            message: "what does the user need to know about using this repo?"
        },
        {
            type: "input",
            name: "Contribution",
            message: "What does the user need to know about contributing to the repo?"
        },
    ]);
}

let getName;

getName = (data) => {
    let queryUrl;
    queryUrl = `https://api.github.com/users/${data.name}`;
    axios.get(queryUrl).then(function(response) {
        return response;
    });
};

let generateMarkDown;

generateMarkDown = (data) => {
    return `
---------------
<center><font size="6px">${data.Name}</center></font>
 ---------------
#

<strong style="color: red">Username:</strong>

${data.Username}
 ---------------
## <strong style="color: red">Project</strong> 

${data.Projectname}

![Github license](https://img.shields.io/badge/license-MIT-blue.svg)

## <strong style="color: red">Description</strong>
${data.Description}
## <strong style="color: red">Table of Contents</strong>
#
* [Usage](#usage)

use this readme in future projects
#
* [License](#license)

${data.License}
#
* [Contribution](#contribution)

${data.Contribution}
#
* [Tips](#tips)

${data.Tips}
#
* [Tests](#tests)

${data.Test}
#
* [Installation](#installation)

Please run a npm i and npm test using node.js
#
For any Questions, Email: Mike@pridesash.com
#
<img src="https://anthonymyers1985.weebly.com/uploads/5/7/4/5/57459889/12743696-10201449901526425-1933875123050792984-n_orig.jpg"
alt="avatar" border= "2px" width="50px" height="50px" />
#
If you're reading this. It only means one thing, you might just be a miracle baby..
`;

};

async function init() {
    try {
        const data = await promptUser();
        const image = await getName(data);
        const readMe = generateMarkDown(data, image);
        await writeFileAsync("README.md", readMe);
        console.log("Wrote a Successful README.md");
    } catch (err) {
        console.log(err);
    }
}
init();