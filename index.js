const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

/*`https://api.github.com/users/${username}?client_id=${
        process.env.CLIENT_ID
        }&client_secret=${process.env.CLIENT_SECRET}`
*/
/*  * Title
  * Description
  * Table of Contents
  * Installation
  * Usage
  * License
  * Contributing
  * Tests
  * Questions
*/

const questions = [
    {
        message: "What's the title?",
        type: "input",
        name: "projectTitle"
    },
    {
        message: "What's the description of the project?",
        type: "input",
        name: "describeProject"        
    },
    {
        message: "What's the table of content?",
        type: "input",
        name: "tableContent"        
    },
    {
        message: "What's the installation?",
        type: "input",
        name: "howInstall"        
    },
    {
        message: "What's the usage?",
        type: "input",
        name: "whatUsage"        
    },
    {
        message: "What is the license?",
        type: "input",
        name: "whatLicense"        
    },
    {
        message: "Who is contributing?",
        type: "input",
        name: "whoContribute"        
    },
    {
        message: "What command to run the test?",
        type: "input",
        name: "testCommand"        
    },
    {
        message: "What's GitHub username?",
        type: "input",
        name: "userName"        
    },
];

function writeToFile(fileName, data) {
    var formatString = generateMarkdown (data)
    
    console.log(fileName)
        fs.writeFile (fileName, data, function (err){
            if(err) {throw err};
            console.log("filewritten")
        });
}

function init() {
    inquirer
    .prompt(questions)  
    .then(answers => {
      // Use user feedback for... whatever!!
      var GitHuburl = generateProjectUrl (
          answers.userName, answers.projectTitle
      );
      var licenseBadge = renderLicenseBadge(
          answers.whatLicense, answers.userName, answers.projectTitle
      );
      var license = renderLicenseSection (
          answers.whatLicense
      );
      var projectTitle = renderProjectTitle (
        answers.projectTitle
      );      
      var describeProject = renderDescribeProject (
        answers.describeProject
      );
      var tableContent = renderTableContent (
        answers.tableContent
      );
      var howInstall = renderInstallation (
        answers.howInstall
      );
      var whatUsage = renderUsage (
        answers.whatUsage
      );
      var whoContribute = renderContributing (
        answers.whoContribute
      );
      var testCommand = renderTest (
        answers.testCommand
      );
      const READMEstring = tableContent + "\n" + projectTitle + "\n" + describeProject + "\n" + howInstall + "\n" + whatUsage + "\n" + whoContribute + "\n" + testCommand + "\n" + license + "\n" + licenseBadge
      writeToFile (
          "README.md", READMEstring
      )
    })
    .catch(error => {
      if(error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
}

//Create a command-line application that uses input from a user to dynamically generates a good README for a GitHub project.




init();

function generateProjectUrl(github, title) {
    const kebabCaseTitle = title.toLowerCase().split(" ").join("-");
    return `https://github.com/${github}/${kebabCaseTitle}`;
}
function renderLicenseBadge(license, github, title) {
    if (license !== "None") {
    return `[![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)](${generateProjectUrl(github, title)})`
    }
    return ''
}
function renderLicenseSection(license) {
    if (license !== "None") {
        return (
        `## License
    This project is licensed under the ${license} license.`
        )
    }
    return ''
}
function renderProjectTitle(Title) {
    if (Title !== "None") {
        return (
        `##  ${Title}.`
        )
    }
    return ''
}
function renderDescribeProject(describe) {
    if (describe !== "None") {
        return (
        `## description
        This is the project description ${describe}.`
        )
    }
    return ''
}
function renderTableContent(content) {
    if (content !== "None") {
        return (
        `## Table of Content 
        ${content}`
        )
    }
    return ''
}
function renderInstallation(install) {
    if (install !== "None") {
        return (
        `## Installation 
        \`${install}\``
        )
    }
    return ''
}
function renderUsage(usage) {
    if (usage !== "None") {
        return (
        `## Usage 
        ${usage}`
        )
    }
    return ''
}
function renderContributing(contribute) {
    if (contribute !== "None") {
        return (
        `## Who contributes 
        ${contribute}`
        )
    }
    return ''
}
function renderTest(test) {
    if (test !== "None") {
        return (
        `## Test 
        \`${test}\``
        )
    }
    return ''
}

